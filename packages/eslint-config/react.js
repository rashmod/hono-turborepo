import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import baseConfig from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
	...baseConfig,
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { globals: globals.browser } },
	pluginReact.configs.flat.recommended,
	pluginReactHooks.configs.recommended,
];
