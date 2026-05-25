import type * as React from 'react';

import { PostHogProvider } from './posthog-provider';
import { ThemeProvider } from './theme-provider';
import { ToasterProvider } from './toaster-provider';

interface ProviderProps {
	children: React.ReactNode;
}

// Single <Providers> wrapper imported by the root layout.
// Add new providers here — root layout.tsx stays clean.
// Order matters: outer providers are available to inner providers.
// ThemeProvider is outermost so theme context is available to everything,
// including any provider UI that might render loading states.
export function AppProviders({ children }: Readonly<ProviderProps>) {
	return (
		<ThemeProvider>
			<PostHogProvider>
				{children}
				<ToasterProvider id="global" />
			</PostHogProvider>
		</ThemeProvider>
	);
}
