import { describe, expect, test } from "bun:test";

import { Result, Schema } from "effect";

import { getSendMessageIssues, SendMessageInputSchema } from "#/lib/schemas";

const decode = Schema.decodeUnknownResult(SendMessageInputSchema, { errors: "all" });

describe("SendMessageInputSchema", () => {
    test("accepts every optional email representation", () => {
        const inputs = [
            { content: "message" },
            { email: undefined, content: "message" },
            { email: null, content: "message" },
            { email: "", content: "message" },
            { email: "test@example.com", content: "message" },
        ];

        for (const input of inputs) {
            expect(Result.isSuccess(decode(input))).toBeTrue();
        }
    });

    test("rejects whitespace-only input after trimming", () => {
        const result = decode({ email: " ", content: "  " });

        expect(Result.isFailure(result)).toBeTrue();
        if (Result.isSuccess(result)) return;
        expect(getSendMessageIssues(result.failure)).toEqual([
            { field: "email", message: "E-mail is required" },
            { field: "email", message: "Invalid e-mail address format" },
            { field: "content", message: "Message can't be empty" },
        ]);
    });
});
