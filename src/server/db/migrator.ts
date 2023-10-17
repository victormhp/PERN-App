import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import path from 'path';
import 'dotenv/config';

async function migrator(): Promise<void> {
  try {
    const postgres = process.env.NODE_ENV === 'production' ? process.env.POSTGRES_URL : process.env.POSTGRES_LOCAL_URL;
    const client = new Client({
      connectionString: postgres ?? '' + '?sslmode=require',
    });

    await client.connect();
    const dbMigration = drizzle(client);

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
