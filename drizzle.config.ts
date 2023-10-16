import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
  schema: './src/server/db/schemas/*',
  out: './src/server/db/migrations',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL ?? '',
  },
} satisfies Config;
