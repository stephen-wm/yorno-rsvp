/** Yorno root Prettier configuration */

const defineConfig = {
	endOfLine: 'lf',
	requirePragma: false,
	insertPragma: false,
	printWidth: 100,
	useTabs: true,
	tabWidth: 2,
	semi: true,
	singleQuote: true,
	quoteProps: 'as-needed',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'always',
	experimentalTernaries: true,
	experimentalOperatorPosition: 'start',
	proseWrap: 'preserve',
	embeddedLanguageFormatting: 'auto',
	singleAttributePerLine: true,
	braceStyle: 'stroustrup',
	plugins: [
		'@trivago/prettier-plugin-sort-imports',
		'prettier-plugin-brace-style',
		'prettier-plugin-tailwindcss',
		'prettier-plugin-classnames',
		'prettier-plugin-merge',
	],
	tailwindStylesheet: './src/styles/globals.css',
	tailwindFunctions: ['cn', 'clsx', 'twMerge'],
	tailwindAttributes: ['className'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	importOrderParserPlugins: ['typescript', 'decorators-legacy', 'jsx'],
	importOrder: [
		'^(react$|react-dom$|react-(?!icons).*)$',
		'^(next$|next/.*)$',
		'<THIRD_PARTY_MODULES>',
		'^(framer-motion|lucide-react|react-icons/.*)$',
		'^(next-themes|@tanstack/.*|@hookform/.*|better-auth|zod|sonner.*)$',
		'^@/(db|providers|lib|config|constants|features|app|emails)(/.*)?$',
		'^@/hooks(/.*)?$',
		'^@/components(/.*)?$',
		'^@/styles(/.*)?$',
		String.raw`\.css$`,
		'^[./]',
	],
	overrides: [
		{
			files: ['*.json', '*.jsonc'],
			options: { printWidth: 100, parser: 'json' },
		},
		{
			files: '*.{yaml,yml}',
			options: {
				useTabs: false,
				tabWidth: 2,
				singleQuote: false,
				bracketSpacing: false,
			},
		},
		{
			files: '*.txt',
			options: {
				useTabs: false,
				tabWidth: 2,
				singleQuote: false,
				bracketSpacing: false,
			},
		},
	],
};

export default defineConfig;
