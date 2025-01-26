import { createRoute, z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';
import { IdParamsSchema, createErrorSchema } from 'stoker/openapi/schemas';

import { insertTaskSchema, selectTasksSchema } from '@/db/schema';
import { notFoundSchema } from '@/lib/not-found-schema';

const tags = ['tasks'];

export const list = createRoute({
	tags,
	method: 'get',
	path: '/tasks',
	responses: {
		[HttpStatusCodes.OK]: jsonContent(z.array(selectTasksSchema), 'Tasks list'),
	},
});

export const create = createRoute({
	tags,
	method: 'post',
	path: '/tasks',
	request: {
		body: jsonContentRequired(insertTaskSchema, 'The task to create'),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(selectTasksSchema, 'The created task'),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(insertTaskSchema),
			'Validation error'
		),
	},
});

export const getOne = createRoute({
	tags,
	method: 'get',
	path: '/tasks/{id}',
	request: {
		params: z.object({
			id: z.coerce.number().openapi({
				param: {
					name: 'id',
					in: 'path',
					required: true,
				},
				example: 42,
			}),
		}),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(selectTasksSchema, 'The task details'),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, 'The task not found'),
		[HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			createErrorSchema(IdParamsSchema),
			'Validation error'
		),
	},
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
