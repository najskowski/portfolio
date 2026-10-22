import { createServerFn } from "@tanstack/react-start";
import { err, ok, Result } from "neverthrow";

import { saveMessage } from "./messages.server";
import type { SendMessageIssue } from "./schemas";

export type SendMessageResponse = { code: 201 | 400 | 500; issues: SendMessageIssue[] };

export type SendMessageError =
    | { kind: "validation"; issues: SendMessageIssue[] }
    | { kind: "storage"; message: string };

export type SentMessage = { email: string; content: string };
export type SentMessageResult = Result<SentMessage, SendMessageError>;

export const sendMessage = createServerFn({ method: "POST" })
    .validator((data: { email?: string; content?: string }) => data)
    .handler(async ({ data }) =>
        saveMessage(data).match(
            () => ({ code: 201, issues: [] }),
            (error) =>
                error.kind === "validation"
                    ? { code: 400, issues: error.issues }
                    : { code: 500, issues: [{ field: "form", message: error.message }] },
        ),
    );

export async function sendMessageResult(data: SentMessage): Promise<SentMessageResult> {
    let response: Awaited<ReturnType<typeof sendMessage>>;
    try {
        response = await sendMessage({ data });
    } catch {
        return err({
            kind: "storage",
            message: "Could not reach the server. Please try again.",
        });
    }
    if (response.code === 201) return ok({ email: data.email, content: data.content });
    if (response.code === 400) return err({ kind: "validation", issues: response.issues });
    return err({
        kind: "storage",
        message: response.issues[0]?.message ?? "Something went wrong. Please try again.",
    });
}
