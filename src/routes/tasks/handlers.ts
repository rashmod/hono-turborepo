import { eq } from 'drizzle-orm';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import * as HttpStatusPhrases from 'stoker/http-status-phrases';

import { db } from '@/db';
import { tasks } from '@/db/schema';
import type { AppRouteHandler } from '@/lib/types';
import type { CreateRoute, GetOneRoute, ListRoute, UpdateRoute } from '@/routes/tasks/routes';

export const listHandler: AppRouteHandler<ListRoute> = async (c) => {
	const tasks = await db.query.tasks.findMany();

	c.var.logger.info('tasks', tasks);

	return c.json(tasks, HttpStatusCodes.OK);
};

export const createHandler: AppRouteHandler<CreateRoute> = async (c) => {
	const taskData = c.req.valid('json');

	const [task] = await db.insert(tasks).values(taskData).returning();

	return c.json(task, HttpStatusCodes.OK);
};

export const getOneHandler: AppRouteHandler<GetOneRoute> = async (c) => {
	const taskData = c.req.valid('param');

	const task = await db.query.tasks.findFirst({
		where(fields, operators) {
			return operators.eq(fields.id, taskData.id);
		},
	});

	if (!task) {
		return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
	}

	return c.json(task, HttpStatusCodes.OK);
};

export const updateHandler: AppRouteHandler<UpdateRoute> = async (c) => {
	const taskParam = c.req.valid('param');
	const taskData = c.req.valid('json');

	const task = await db.query.tasks.findFirst({
		where(fields, operators) {
			return operators.eq(fields.id, taskParam.id);
		},
	});

	if (!task) {
		return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
	}

	const [updatedTask] = await db
		.update(tasks)
		.set(taskData)
		.where(eq(tasks.id, taskParam.id))
		.returning();

	return c.json(updatedTask, HttpStatusCodes.OK);
};
