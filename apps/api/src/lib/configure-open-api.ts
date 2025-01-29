import { apiReference } from '@scalar/hono-api-reference';

import type { AppOpenApi } from '@/lib/types';

import packageJson from '../../package.json' with { type: 'json' };

export function configureOpenAPI(app: AppOpenApi) {
	app.doc('/doc', {
		openapi: '3.0.0',
		info: {
			title: 'Tasks API',
			version: packageJson.version,
		},
	});

	app.get(
		'/reference',
		apiReference({
			spec: {
				url: '/doc',
			},
			theme: 'kepler',
			layout: 'classic',
			defaultHttpClient: {
				targetKey: 'js',
				clientKey: 'fetch',
			},
		})
	);
}
