import { configureOpenAPI } from '@/lib/configure-open-api';
import { createApp } from '@/lib/create-app';
import { router as index } from '@/routes/index';
import { router as tasks } from '@/routes/tasks';

const app = createApp();

const routes = [index, tasks];

configureOpenAPI(app);

routes.forEach((route) => {
	app.route('/', route);
});

export default app;
