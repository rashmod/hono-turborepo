import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';

import { selectTasksSchema } from '@/db/schema';

const tags = ['tasks'];

export const list = createRoute({
	tags,
	method: 'get',
	path: '/tasks',
	responses: {
		[HttpStatusCodes.OK]: jsonContent(z.array(selectTasksSchema), 'Tasks list'),
	},
});

export type ListRoute = typeof list;
