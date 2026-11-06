import { createServerFn } from "@tanstack/react-start";
import { Effect, Exit, Schedule, Cause } from "effect";

import { DatabaseRuntime } from "./database.server";
import { saveMessage } from "./messages.server";
import { SendMessageInputSchema } from "./schemas";

type SendMessageInput = typeof SendMessageInputSchema.Type;

export const sendMessage = createServerFn({ method: "POST" })
    .validator((data: SendMessageInput) => data)
    .handler(async ({ data }) => {
        const exit = await DatabaseRuntime.runPromiseExit(
            saveMessage(data).pipe(
                Effect.retry({
                    schedule: Schedule.spaced("5 seconds"),
                    times: 3,
                    // if the error is SchemaError skip retries
                    while: (error) => error._tag !== "SchemaError",
                }),
            ),
        );
        if (Exit.isFailure(exit)) {
            console.error("[ERROR] sendMessage <\n", Cause.pretty(exit.cause));
            const issues = exit.cause.reasons.flatMap((reason) =>
                Cause.isFailReason(reason) ? [reason.error.message] : [],
            );
            return {
                status: "error",
                issues: issues.length > 0 ? issues : ["Failed to save the message"],
            };
        }
        return { status: "sent" };
    });
