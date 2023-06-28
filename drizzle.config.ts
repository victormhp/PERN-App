import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schemas/*',
  out: './drizzle/migrations',
} satisfies Config;
