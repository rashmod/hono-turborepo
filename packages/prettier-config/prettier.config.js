export default {
	plugins: ['@trivago/prettier-plugin-sort-imports'],

	printWidth: 100,
	useTabs: true,
	trailingComma: 'es5',
	semi: true,
	singleQuote: true,
	bracketSpacing: true,
	arrowParens: 'always',
	jsxSingleQuote: false,
	bracketSameLine: false,
	endOfLine: 'lf',

	importOrder: ['<THIRD_PARTY_MODULES>', '^@/', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
};
