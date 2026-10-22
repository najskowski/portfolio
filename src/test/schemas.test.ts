import { describe, test, expect } from "bun:test";

import * as v from "valibot";

import { GetMessagesInputSchema } from "#/lib/functions";

describe("GetMessagesInputSchema", () => {
    test.failing("throw on negative integer", () => {
        expect(v.parse(GetMessagesInputSchema, { skip: -1 })).toThrow();
    });
    test.failing("throw on negative integer", () => {
        expect(v.parse(GetMessagesInputSchema, { skip: 0 })).toBeNumber();
    });
});
