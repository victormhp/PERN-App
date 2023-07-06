import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { type InferModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { enum: ['admin', 'user'], length: 100 })
    .default('user')
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const registerUserSchema = createInsertSchema(users, {
  email: (schema) => schema.email.nonempty('Email is required').email({ message: 'Invalid email address' }),
  username: (schema) =>
    schema.username.min(4, { message: 'Must be 4 or more characters long' }).max(20, { message: 'Must be 20 or fewer characters long' }),
  password: z.string().nonempty('Password is required').min(6, 'Password too short'),
});

export const loginUserSchema = registerUserSchema.pick({ email: true, password: true });

export type User = InferModel<typeof users, 'select'>;
export type NewUser = InferModel<typeof users, 'insert'>;
