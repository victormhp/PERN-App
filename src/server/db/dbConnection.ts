import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'dotenv/config';

const postgres = process.env.POSTGRES_URL ?? '';

const pool = new Pool({
  connectionString: postgres + '?sslmode=require',
});
const db = drizzle(pool);

export default db;
