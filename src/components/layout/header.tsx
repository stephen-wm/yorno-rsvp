'use client';

import { type ComponentPropsWithoutRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { ThemeToggler } from '@/components/shared/theme-toggler';
import { Button } from '@/components/ui/button';

interface HeaderProps extends ComponentPropsWithoutRef<'header'> {
	className?: string;
}

export function Header({ className, ...props }: Readonly<HeaderProps>) {
	return (
		<header
			className={cn(
				'flex h-18 w-full max-w-full items-center justify-center',
				className,
			)}
			{...props}
		>
			<div
				className="container flex items-center justify-start self-stretch px-4"
			>
				{/* Branding */}
				<Link href="/">
					<Image
						alt="Yorno logo"
						className="block transition-all duration-150 hover:opacity-75
							dark:hidden"
						height={0}
						priority
						src="/logos/yorno-primary.svg"
						style={{ height: 'auto', width: '110px' }}
						width={0}
					/>
					<Image
						alt="Yorno logo"
						className="hidden transition-all duration-150 hover:opacity-75
							dark:block"
						height={0}
						priority
						src="/logos/yorno-outline.svg"
						style={{ height: 'auto', width: '110px' }}
						width={0}
					/>
				</Link>

				{/* Desktop Actions */}
				<div className="ml-auto flex items-center justify-end gap-2">
					<Button
						asChild
						className="hidden lg:flex"
						variant="ghost"
					>
						<Link href="/sign-in">Sign in</Link>
					</Button>
					<Button
						asChild
						variant="default"
					>
						<Link href="/sign-up">Get started free</Link>
					</Button>

					<ThemeToggler />
				</div>
			</div>
		</header>
	);
}
