import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import 'eslint-plugin-only-warn';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ ignores: ['dist/**'] },

	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
