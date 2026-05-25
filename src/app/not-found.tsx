'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FileQuestion } from 'lucide-react';

export default function NotFound() {
	const router = useRouter();

	return (
		<main
			className="flex min-h-screen flex-col items-center justify-center
				bg-background px-6 text-center"
		>
			<div className="flex max-w-md flex-col items-center gap-6">
				<div
					className="flex size-20 items-center justify-center rounded-2xl
						bg-muted"
				>
					<FileQuestion className="size-10 text-muted-foreground" />
				</div>

				<div className="flex flex-col gap-2">
					<h1 className="text-4xl font-bold tracking-tight text-foreground">
						404
					</h1>
					<h2 className="text-xl font-semibold text-foreground">
						Page not found
					</h2>
					<p className="text-sm/relaxed text-muted-foreground">
						The page you&apos;re looking for doesn&apos;t exist or has been
						moved. Double-check the URL or head back to the dashboard.
					</p>
				</div>

				<div className="flex flex-col gap-3 sm:flex-row">
					<Link
						className="inline-flex h-9 items-center justify-center rounded-md
							bg-primary px-6 text-sm font-medium text-primary-foreground
							shadow-sm transition-colors hover:bg-primary/90
							focus-visible:ring-1 focus-visible:ring-ring
							focus-visible:outline-none"
						href="/"
					>
						Go home
					</Link>
					<Link
						className="inline-flex h-9 items-center justify-center rounded-md
							border border-input bg-background px-6 text-sm font-medium
							shadow-sm transition-colors hover:bg-accent
							hover:text-accent-foreground focus-visible:ring-1
							focus-visible:ring-ring focus-visible:outline-none"
						href="#"
						onClick={() => router.back()}
					>
						Go back
					</Link>
				</div>
			</div>
		</main>
	);
}
