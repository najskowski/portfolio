import { Schema, SchemaIssue } from "effect";

export type SendMessageIssue = { field: string; message: string };

const formatIssue = SchemaIssue.makeFormatterStandardSchemaV1();

export const getSendMessageIssues = (error: Schema.SchemaError): SendMessageIssue[] =>
    formatIssue(error.issue).issues.map((issue) => ({
        field: String(issue.path?.[0] ?? "form"),
        message: issue.message,
    }));

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailSchema = Schema.optional(
    Schema.NullOr(
        Schema.Union([
            Schema.Literal(""),
            Schema.Trim.check(
                Schema.isMinLength(1, { message: "E-mail is required" }),
                Schema.isMaxLength(320, { message: "E-mail can't be longer than 320 characters" }),
                Schema.isPattern(EMAIL_PATTERN, { message: "Invalid e-mail address format" }),
            ),
        ]),
    ),
);

const MessageContentSchema = Schema.Trim.check(
    Schema.isMinLength(1, { message: "Message can't be empty" }),
    Schema.isMaxLength(1024, { message: "Message can't be longer than 1024 characters" }),
);

export const SendMessageInputSchema = Schema.Struct({
    email: EmailSchema,
    content: MessageContentSchema,
});
