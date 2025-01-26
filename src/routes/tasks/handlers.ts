import * as HttpStatusCodes from 'stoker/http-status-codes';
import * as HttpStatusPhrases from 'stoker/http-status-phrases';

import { db } from '@/db';
import { tasks } from '@/db/schema';
import type { AppRouteHandler } from '@/lib/types';
import type { CreateRoute, GetOneRoute, ListRoute } from '@/routes/tasks/routes';

export const listHandler: AppRouteHandler<ListRoute> = async (c) => {
	c.var.logger.info('listHandler');

	const tasks = await db.query.tasks.findMany();

	c.var.logger.info('tasks', tasks);

	return c.json(tasks, HttpStatusCodes.OK);
};

export const createHandler: AppRouteHandler<CreateRoute> = async (c) => {
	c.var.logger.info('createHandler');

	const taskData = c.req.valid('json');

	const [task] = await db.insert(tasks).values(taskData).returning();

	return c.json(task, HttpStatusCodes.OK);
};

export const getOneHandler: AppRouteHandler<GetOneRoute> = async (c) => {
	c.var.logger.info('getOneHandler');

	const taskData = c.req.valid('param');

	c.var.logger.info('taskData', taskData.id);

	const task = await db.query.tasks.findFirst({
		where(fields, operators) {
			return operators.eq(fields.id, taskData.id);
		},
	});

	c.var.logger.info('task', task);

	if (!task) {
		return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
	}

	return c.json(task, HttpStatusCodes.OK);
};
