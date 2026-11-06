import { Effect, Schema } from "effect";
import { SqlClient } from "effect/sql";

import { SendMessageInputSchema } from "./schemas";

export const saveMessage = Effect.fn("Messages/save")(function* (input) {
    const message = yield* Schema.decodeUnknownEffect(SendMessageInputSchema, { errors: "all" })(
        input,
    );
    const email =
        message.email === undefined || message.email === null || message.email === ""
            ? null
            : message.email;
    const sql = yield* SqlClient.SqlClient;
    yield* sql`
        INSERT INTO messages (email, content)
        VALUES (${email}, ${message.content})
    `;
    return { email, content: message.content };
});
