import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { createMetadata } from '@/lib/create-metadata';
import { cn } from '@/lib/utils';
import { AppProviders } from '@/providers';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = createMetadata({});
export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
		{ media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			className={cn('h-full', 'antialiased', 'font-sans', inter.variable)}
			lang="en"
			suppressHydrationWarning
		>
			<body className="flex min-h-full flex-col">
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
}
