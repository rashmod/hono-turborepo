import { logger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

import env from '@/env';

export function pinoLogger() {
	return logger({
		pino: pino(
			{ level: env.NODE_ENV === 'development' ? 'debug' : 'info' },
			env.NODE_ENV === 'development' ? pretty() : undefined
		),
		http: {
			reqId: () => crypto.randomUUID(),
		},
	});
}
