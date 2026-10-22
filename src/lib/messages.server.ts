import { err, Result } from "neverthrow";
import * as v from "valibot";

import { getDatabaseInstance } from "./database.server";
import { SendMessageInputSchema, type SendMessageIssue } from "./schemas";

const INSERT_STATEMENT = "INSERT INTO messages (email, content) VALUES (?1, ?2)";

export const SAVE_MESSAGE_ERROR = "Something went wrong on our side. Please try again later.";

export type SaveMessageSuccess = { email: string; content: string };
export type SaveMessageError =
    | { kind: "validation"; issues: SendMessageIssue[] }
    | { kind: "storage"; message: string };

const toStorageError = (): SaveMessageError => ({ kind: "storage", message: SAVE_MESSAGE_ERROR });

export function saveMessage(data: {
    email?: string;
    content?: string;
}): Result<SaveMessageSuccess, SaveMessageError> {
    const validation = v.safeParse(SendMessageInputSchema, data);
    if (!validation.success) {
        return err({
            kind: "validation",
            issues: validation.issues.map((issue) => ({
                field: String(issue.path?.[0]?.key ?? "form"),
                message: issue.message,
            })),
        });
    }
    return getDatabaseInstance()
        .mapErr(toStorageError)
        .andThen((database) =>
            Result.fromThrowable(
                () =>
                    database
                        .prepare(INSERT_STATEMENT)
                        .run(validation.output.email, validation.output.content),
                toStorageError,
            )(),
        )
        .map(() => validation.output);
}
