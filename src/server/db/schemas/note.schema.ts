import { pgTable, serial, timestamp, varchar, boolean, integer } from 'drizzle-orm/pg-core';
import { relations, type InferModel } from 'drizzle-orm';
import { users } from './user.schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  title: varchar('username', { length: 100 }).notNull(),
  description: varchar('password', { length: 255 }).notNull(),
  completed: boolean('completed').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const notesRelations = relations(notes, ({ one }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.id],
  }),
}));

export const createNoteSchema = createInsertSchema(notes, {
  userId: z
    .number({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a number',
    })
    .positive('Value must be a positive integer'),
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .nonempty('Title is required'),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .nonempty('Description is required'),
});

export type Note = InferModel<typeof notes, 'select'>;
export type NewNote = InferModel<typeof notes, 'insert'>;
