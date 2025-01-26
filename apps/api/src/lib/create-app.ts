import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';

import { AppBindings } from '@/lib/types';
import { pinoLogger } from '@/middlewares/pino-logger';

export function createRouter() {
	return new OpenAPIHono<AppBindings>({ strict: false, defaultHook });
}

export function createApp() {
	const app = createRouter();

	app.use(serveEmojiFavicon('👋'));
	app.use(pinoLogger());

	app.onError(onError);
	app.notFound(notFound);

	return app;
}
