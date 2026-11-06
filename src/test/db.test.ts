import { afterAll, describe, expect, test } from "bun:test";

import { Effect, ManagedRuntime, Result, Schema } from "effect";
import { SqlClient } from "effect/sql";

import { makeDatabaseLayer } from "#/lib/database.server";
import { saveMessage } from "#/lib/messages.server";
import { getSendMessageIssues } from "#/lib/schemas";

const runtime = ManagedRuntime.make(makeDatabaseLayer(":memory:"));

afterAll(() => runtime.dispose());

const runSaveMessage = (input: unknown) => runtime.runPromise(Effect.result(saveMessage(input)));

describe("saveMessage", () => {
    test("returns every validation issue", async () => {
        const result = await runSaveMessage({ email: "INVALID EMAIL", content: "" });

        expect(Result.isFailure(result)).toBeTrue();
        if (Result.isSuccess(result) || !Schema.isSchemaError(result.failure)) return;

        expect(getSendMessageIssues(result.failure)).toEqual([
            { field: "email", message: "Invalid e-mail address format" },
            { field: "content", message: "Message can't be empty" },
        ]);
    });

    test("rejects content over the storage limit", async () => {
        const result = await runSaveMessage({
            email: "test@mail.com",
            content: "A".repeat(1025),
        });

        expect(Result.isFailure(result)).toBeTrue();
        if (Result.isSuccess(result) || !Schema.isSchemaError(result.failure)) return;

        expect(getSendMessageIssues(result.failure)).toEqual([
            { field: "content", message: "Message can't be longer than 1024 characters" },
        ]);
    });

    test("stores every empty email representation as null", async () => {
        const inputs = [
            { content: "missing email" },
            { email: undefined, content: "undefined email" },
            { email: null, content: "null email" },
            { email: "", content: "empty email" },
        ];

        for (const input of inputs) {
            const result = await runSaveMessage(input);
            expect(Result.isSuccess(result)).toBeTrue();
            if (Result.isFailure(result)) continue;
            expect(result.success.email).toBeNull();
        }

        const stored = await runtime.runPromise(
            Effect.gen(function* () {
                const sql = yield* SqlClient.SqlClient;
                return yield* sql<{ email: string | null; content: string }>`
                    SELECT email, content
                    FROM messages
                    ORDER BY id
                `;
            }),
        );

        expect(stored).toEqual([
            { email: null, content: "missing email" },
            { email: null, content: "undefined email" },
            { email: null, content: "null email" },
            { email: null, content: "empty email" },
        ]);
    });

    test("normalizes and stores a valid message", async () => {
        const result = await runSaveMessage({
            email: "  test@mail.com ",
            content: "  VALID CONTENT  ",
        });

        expect(Result.isSuccess(result)).toBeTrue();
        if (Result.isFailure(result)) return;
        expect(result.success).toEqual({ email: "test@mail.com", content: "VALID CONTENT" });

        const stored = await runtime.runPromise(
            Effect.gen(function* () {
                const sql = yield* SqlClient.SqlClient;
                return yield* sql<{ email: string | null; content: string }>`
                    SELECT email, content
                    FROM messages
                    ORDER BY id DESC
                    LIMIT 1
                `;
            }),
        );

        expect(stored).toEqual([{ email: "test@mail.com", content: "VALID CONTENT" }]);
    });
});
