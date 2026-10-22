import { describe, test, expect } from "bun:test";

import { saveMessage } from "#/lib/messages.server";

describe("saveMessage", () => {
    test("invalid email & invalid content", () => {
        const error = saveMessage({ email: "INVALID EMAIL", content: "" })._unsafeUnwrapErr();
        expect(error).toEqual({
            kind: "validation",
            issues: [
                expect.objectContaining({ field: "email" }),
                expect.objectContaining({ field: "content" }),
            ],
        });
    });
    test("invalid email & valid content", () => {
        const error = saveMessage({
            email: "INVALID EMAIL",
            content: "VALID CONTENT",
        })._unsafeUnwrapErr();
        expect(error).toEqual({
            kind: "validation",
            issues: [expect.objectContaining({ field: "email" })],
        });
    });
    test("valid email & invalid content", () => {
        const error = saveMessage({ email: "test@mail.com", content: "" })._unsafeUnwrapErr();
        expect(error).toEqual({
            kind: "validation",
            issues: [expect.objectContaining({ field: "content" })],
        });
    });
    test("valid email & over-long content", () => {
        const error = saveMessage({
            email: "test@mail.com",
            content: "A".repeat(1025),
        })._unsafeUnwrapErr();
        expect(error).toEqual({
            kind: "validation",
            issues: [expect.objectContaining({ field: "content" })],
        });
    });
    test("valid email & valid content", () => {
        const success = saveMessage({
            email: "test@mail.com",
            content: "VALID CONTENT",
        })._unsafeUnwrap();
        expect(success).toEqual({ email: "test@mail.com", content: "VALID CONTENT" });
    });
});
