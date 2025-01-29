declare module '@tasks/eslint-config/base' {
	import type { Linter } from 'eslint';

	const config: Linter.Config;
	export default config;
}
