import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';

const tags = ['tasks'];

export const list = createRoute({
	tags,
	method: 'get',
	path: '/tasks',
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(
				z.object({
					content: z.string(),
					done: z.boolean(),
				})
			),
			'Tasks list'
		),
	},
});

export type ListRoute = typeof list;
