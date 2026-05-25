import { type ReactNode } from 'react';

import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { ThemeToggler } from '@/components/shared/theme-toggler';

export default function AuthLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<div className="flex flex-1 flex-col">
			<header
				className="fixed inset-x-0 top-0 flex h-18 w-full max-w-full
					items-center justify-center"
			>
				<div
					className="container flex items-center justify-start self-stretch
						px-4"
				>
					<Link
						className="flex items-center gap-1 text-muted-foreground"
						href="/"
					>
						<ArrowLeft className="size-4" />
						Go back
					</Link>

					<ThemeToggler className="ml-auto" />
				</div>
			</header>

			<div className="flex flex-1">{children}</div>
		</div>
	);
}
