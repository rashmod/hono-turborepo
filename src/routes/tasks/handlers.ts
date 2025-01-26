import * as HttpStatusCodes from 'stoker/http-status-codes';

import type { ListRoute } from '@/routes/tasks/routes';
import { db } from '@/db';
import type { AppRouteHandler } from '@/lib/types';

export const listHandler: AppRouteHandler<ListRoute> = async (c) => {
	c.var.logger.info('listHandler');

	const tasks = await db.query.tasks.findMany();

	c.var.logger.info('tasks', tasks);

	return c.json(tasks, HttpStatusCodes.OK);
};
