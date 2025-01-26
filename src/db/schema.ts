import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const tasks = sqliteTable('tasks', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name', { length: 100 }).notNull(),
	done: integer('done', { mode: 'boolean' }).notNull().default(false),

	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.$onUpdate(() => new Date()),
});

export const selectTasksSchema = createSelectSchema(tasks);

const validTaskSchema = createInsertSchema(tasks, {
	name: (schema) => schema.min(1),
});
export const insertTaskSchema = validTaskSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	done: true,
});
export const updateTaskSchema = validTaskSchema
	.pick({
		name: true,
		done: true,
	})
	.partial();
