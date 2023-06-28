import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL ?? '';

const queryClient = postgres(connectionString);

const db: PostgresJsDatabase = drizzle(queryClient);

export default db;
