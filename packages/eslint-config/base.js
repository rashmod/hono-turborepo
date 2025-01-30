import pluginJs from '@eslint/js';
import 'eslint-plugin-only-warn';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ ignores: ['dist/**'] },

	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
