import * as HttpStatusCodes from 'stoker/http-status-codes';

import { db } from '@/db';
import { tasks } from '@/db/schema';
import type { AppRouteHandler } from '@/lib/types';
import type { CreateRoute, ListRoute } from '@/routes/tasks/routes';

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
