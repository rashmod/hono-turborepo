import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent } from 'stoker/openapi/helpers';

import { createRouter } from '@/lib/create-app';

export const router = createRouter().openapi(
	createRoute({
		tags: ['Index'],
		method: 'get',
		path: '/',
		responses: {
			[HttpStatusCodes.OK]: jsonContent(
				z.object({
					message: z.string(),
				}),
				'Tasks API index'
			),
		},
	}),
	(c) => {
		return c.json(
			{
				message: 'Hello Hono!',
			},
			HttpStatusCodes.OK
		);
	}
);
