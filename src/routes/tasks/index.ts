import { createRouter } from '@/lib/create-app';
import * as handler from '@/routes/tasks/handlers';
import * as routes from '@/routes/tasks/routes';

export const router = createRouter()
	.openapi(routes.list, handler.listHandler)
	.openapi(routes.create, handler.createHandler);
