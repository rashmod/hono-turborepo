import * as HttpStatusCodes from 'stoker/http-status-codes';

import { AppRouteHandler } from '@/lib/types';
import type { ListRoute } from '@/routes/tasks/routes';

export const listHandler: AppRouteHandler<ListRoute> = (c) => {
	c.var.logger.info('listHandler');

	return c.json([{ content: 'Task 1', done: false }], HttpStatusCodes.OK);
};
