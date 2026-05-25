'use client';

import { type ReactNode } from 'react';

import { Header } from '@/components/layout/header';

export default function MarketingLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<div className="flex flex-1 flex-col">
			<Header className="fixed inset-x-0 top-0" />

			{/* <header
				className="fixed inset-x-0 top-0 flex h-18 w-full max-w-full items-center justify-center
					bg-transparent"
			>
				<div className="container flex items-center justify-center self-stretch px-4">
					{isMounted && (
						<button
							className="group ml-auto grid size-8 cursor-pointer place-items-center rounded-lg
								border border-muted text-muted-foreground transition-all duration-150
								focus-within:text-primary hover:border-border hover:bg-secondary hover:text-primary
								dark:border-white/8"
							onClick={() => setTheme(isDark ? 'light' : 'dark')}
						>
							{isDark ?
								<Moon className="size-4" />
							:	<Sun className="size-4" />}
						</button>
					)}
				</div>
			</header> */}

			{children}
		</div>
	);
}
