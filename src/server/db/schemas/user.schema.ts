import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations, type InferModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { notes } from './note.schema';

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

export const usersRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}));

export const registerUserSchema = createInsertSchema(users, {
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .nonempty('Email is required')
    .email({ message: 'Invalid email address' }),
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .nonempty('Username is required')
    .min(4, { message: 'Must be 4 or more characters long' })
    .max(20, { message: 'Must be 20 or fewer characters long' }),
  password: z.string().nonempty('Password is required').min(6, 'Password too short'),
});

export const loginUserSchema = registerUserSchema.pick({ username: true, password: true });

export type User = InferModel<typeof users, 'select'>;
export type NewUser = z.infer<typeof registerUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
