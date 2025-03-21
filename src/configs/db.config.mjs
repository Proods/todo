import * as env from '../../config.mjs';
import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const pool = new pg.Pool({
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
});

const db = drizzle(pool);

(async () => {
    try {
        await migrate(db, { migrationsFolder: 'migrations' });
    } catch (error) {
        console.log("Migration unsuccessful");
    }
})();

export default db;