import { configureOpenAPI } from '@/lib/configure-open-api';
import { createApp } from '@/lib/create-app';

import { router as index } from './routes';

const app = createApp();

const routes = [index];

configureOpenAPI(app);

routes.forEach((route) => {
	app.route('/', route);
});

export default app;
