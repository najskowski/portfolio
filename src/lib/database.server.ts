import { Database } from "bun:sqlite";

import { ok, Result } from "neverthrow";

const schema = `CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`;

export type DatabaseError = { message: string };

const toDatabaseError = (error: unknown): DatabaseError => ({
    message: error instanceof Error ? error.message : "Failed to initialize the database.",
});

const initializeDatabase = Result.fromThrowable(() => {
    const database = new Database("db.sqlite");
    database.run(schema);
    return database;
}, toDatabaseError);

let instance: Database | undefined;

export function getDatabaseInstance(): Result<Database, DatabaseError> {
    if (instance) return ok(instance);
    return initializeDatabase().map((database) => {
        instance = database;
        return database;
    });
}
