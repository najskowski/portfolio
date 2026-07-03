import { serve } from "bun";
import index from "./index.html";
import { contactFormSchema } from "@/constants";
import { Database } from "bun:sqlite";
import * as v from "valibot";

const db = new Database("db.sqlite", { strict: true, create: true });
db.query(
    "CREATE TABLE IF NOT EXISTS msg (id INTEGER PRIMARY KEY, email TEXT, message TEXT);",
).run();

const server = serve({
    routes: {
        "/*": index,
        "/api/message": {
            async POST(req) {
                const data = await req.json();
                const validation = v.safeParse(contactFormSchema, data);
                if (!validation.success) {
                    return Response.json({ error: "Validation failed" }, { status: 400 });
                }
                db.query("INSERT INTO msg (email, message) VALUES ($email, $message)").run(validation.output);
                return Response.json(null, { status: 201 });
            },
        },
    },
    development: process.env.NODE_ENV !== "production" && {
        hmr: true,
        console: true,
    },
});

console.log(`🚀 Server running at ${server.url}`);
