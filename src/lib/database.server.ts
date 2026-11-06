import { SqliteClient, SqliteMigrator } from "@effect/sql-sqlite-bun";
import { Effect, Layer, ManagedRuntime } from "effect";
import { SqlClient } from "effect/sql";

export const makeDatabaseLayer = (filename: string) => {
    const SqliteLive = SqliteClient.layer({
        filename,
        create: true,
    });

    return SqliteMigrator.layer({
        loader: SqliteMigrator.fromRecord({
            "0001_create_messages": Effect.gen(function* () {
                const sql = yield* SqlClient.SqlClient;
                yield* sql`
                CREATE TABLE IF NOT EXISTS messages (
                    id INTEGER PRIMARY KEY,
                    email TEXT CHECK(email IS NULL OR length(email) BETWEEN 3 AND 320),
                    content TEXT NOT NULL CHECK(length(content) BETWEEN 1 AND 1024),
                    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
                )
            `;
            }),
        }),
    }).pipe(Layer.provideMerge(SqliteLive));
};

// Keep the scoped SQLite connection and migration state alive across requests.
export const DatabaseRuntime = ManagedRuntime.make(makeDatabaseLayer("database.sqlite"));

if (import.meta.hot) {
    import.meta.hot.dispose(() => {
        void DatabaseRuntime.dispose();
    });
}
