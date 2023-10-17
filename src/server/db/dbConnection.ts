import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'dotenv/config';

const postgres = process.env.NODE_ENV === 'production' ? process.env.POSTGRES_URL : process.env.POSTGRES_LOCAL_URL;

const pool = new Pool({
  connectionString: postgres ?? '' + '?sslmode=require',
});
const db = drizzle(pool);

export default db;
