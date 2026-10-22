import * as v from "valibot";

export type SendMessageIssue = { field: string; message: string };

export const SendMessageInputSchema = v.object({
    email: v.pipe(v.string("E-mail is required"), v.email("Invalid e-mail address format")),
    content: v.pipe(
        v.string("Message is required"),
        v.minLength(1, "Message can't be empty"),
        v.maxLength(1024, "Message can't be longer than 1024 characters"),
    ),
});
