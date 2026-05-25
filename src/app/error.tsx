'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import * as Sentry from '@sentry/nextjs';

import { AlertTriangle } from 'lucide-react';

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: Readonly<ErrorPageProps>) {
	useEffect(() => {
		// Report the error to Sentry.
		// The Sentry Next.js SDK also catches these automatically at the framework
		// level but calling `captureException` here ensures the error is
		// associated  with the correct * component boundary context
		Sentry.captureException(error);
	}, [error]);
	return (
		<main
			className="flex min-h-screen flex-col items-center justify-center
				bg-background px-6 text-center"
		>
			<div className="flex max-w-md flex-col items-center gap-6">
				<div
					className="flex size-20 items-center justify-center rounded-2xl
						bg-destructive/10"
				>
					<AlertTriangle className="size-10 text-destructive" />
				</div>

				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold tracking-tight text-foreground">
						Something went wrong
					</h1>
					<p className="text-sm/relaxed text-muted-foreground">
						An unexpected error occurred. The team has been notified. You can
						try again, if the problem persists, please contact support.
					</p>
					{error.digest && (
						<p className="mt-1 font-mono text-xs text-muted-foreground">
							Error ID: {error.digest}
						</p>
					)}
				</div>

				<div className="flex flex-col gap-3 sm:flex-row">
					<button
						className="inline-flex h-9 items-center justify-center rounded-md
							bg-primary px-6 text-sm font-medium text-primary-foreground
							shadow-sm transition-colors hover:bg-primary/90
							focus-visible:ring-1 focus-visible:ring-ring
							focus-visible:outline-none"
						onClick={reset}
					>
						Try again
					</button>
					<Link
						className="inline-flex h-9 items-center justify-center rounded-md
							border border-input bg-background px-6 text-sm font-medium
							shadow-sm transition-colors hover:bg-accent
							hover:text-accent-foreground focus-visible:ring-1
							focus-visible:ring-ring focus-visible:outline-none"
						href="/"
					>
						Go home
					</Link>
				</div>
			</div>
		</main>
	);
}
