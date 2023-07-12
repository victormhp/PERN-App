import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import path from 'path';
import 'dotenv/config';

async function migrator(): Promise<void> {
  try {
    const connectionString: string = process.env.DATABASE_URL ?? '';

    const migrationClient = postgres(connectionString, { max: 1 });

    const dbMigration: PostgresJsDatabase = drizzle(migrationClient);

    await migrate(dbMigration, {
      migrationsFolder: path.resolve(__dirname, 'migrations'),
    });

    console.log('Migration done');
    process.exit(0);
  } catch (err) {
    console.log('Migration error: ', err);
    process.exit(0);
  }
}

void migrator();
