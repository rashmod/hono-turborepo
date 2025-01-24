import { configureOpenAPI } from '@/lib/configure-open-api';
import { createApp } from '@/lib/create-app';

const app = createApp();

configureOpenAPI(app);

app.get('/', (c) => {
	c.var.logger.info('Hello Hono!');
	return c.text('Hello Hono!');
});

export default app;
