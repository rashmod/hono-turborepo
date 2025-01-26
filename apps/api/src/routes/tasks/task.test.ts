import { testClient } from 'hono/testing';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { afterAll, beforeAll, describe, expect, expectTypeOf, it } from 'vitest';

import { createApp, createRouter } from '@/lib/create-app';
import * as handler from '@/routes/tasks/handlers';
import * as routes from '@/routes/tasks/routes';

describe('tasks', () => {
	beforeAll(async () => {
		execSync('bun drizzle-kit push');
	});

	afterAll(async () => {
		fs.rmSync('test.db', { force: true });
	});

	const app = createApp();

	const router = createRouter()
		.openapi(routes.list, handler.listHandler)
		.openapi(routes.create, handler.createHandler)
		.openapi(routes.getOne, handler.getOneHandler)
		.openapi(routes.update, handler.updateHandler)
		.openapi(routes.remove, handler.removeHandler);

	const client = testClient(app.route('/', router));

	it('responds with an array', async () => {
		const response = await client.tasks.$get();
		const result = await response.json();

		expectTypeOf(result).toBeArray();
	});

	it('validates the id param', async () => {
		const response = await client.tasks[':id'].$get({
			param: {
				// @ts-expect-error
				id: 'aasdf',
			},
		});

		expect(response.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY);
	});
});
