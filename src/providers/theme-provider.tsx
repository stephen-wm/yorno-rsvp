'use client';

import {
	ThemeProvider as NextThemeProvider,
	type ThemeProviderProps as NextThemeProviderProps,
} from 'next-themes';

// These props are locked as app-wide constants and intentionally
// excluded from the public API of this wrapper
type ThemeProviderProps = Omit<
	NextThemeProviderProps,
	'attribute' | 'defaultTheme' | 'disableTransitionOnChange' | 'enableColorScheme' | 'enableSystem'
>;

/* —— MARK: THEME PROVIDER —————————————————————————————————————————————————————————————————————— */

export function ThemeProvider({ children, ...props }: Readonly<ThemeProviderProps>) {
	return (
		<NextThemeProvider
			attribute="class"
			defaultTheme="light"
			disableTransitionOnChange
			enableColorScheme
			enableSystem
			storageKey="yorno-web-theme"
			themes={['light', 'dark']}
			{...props}
		>
			{children}
		</NextThemeProvider>
	);
}
