'use client';

import { Suspense, useEffect } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';

function PostHogPageView() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const ph = usePostHog();

	useEffect(() => {
		let url = window.origin + pathname;
		const search = searchParams.toString();
		if (search) {
			url += `?${search}`;
		}
		ph.capture('$pageview', { $current_url: url });
	}, [pathname, searchParams, ph]);

	return null;
}

if (typeof window !== 'undefined') {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
		api_host: '/ingest',
		ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		capture_pageview: false,
		capture_pageleave: true,
	});
}

interface PostHogProviderProps {
	children: React.ReactNode;
}

export function PostHogProvider({ children }: Readonly<PostHogProviderProps>) {
	return (
		<PHProvider client={posthog}>
			<Suspense fallback={null}>
				<PostHogPageView />
			</Suspense>
			{children}
		</PHProvider>
	);
}
