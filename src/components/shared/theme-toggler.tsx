'use client';

import { type ComponentPropsWithoutRef } from 'react';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

import { useIsMounted } from '@/hooks/use-is-mounted';

import { Skeleton } from '@/components/ui/skeleton';

interface ThemeTogglerProps extends ComponentPropsWithoutRef<'button'> {
	className?: string;
}

export function ThemeToggler({
	className,
	...props
}: Readonly<ThemeTogglerProps>) {
	const { resolvedTheme, setTheme } = useTheme();
	const isMounted = useIsMounted();
	const isDark = resolvedTheme === 'dark';

	if (!isMounted) {
		return (
			<Skeleton
				className="size-8 rounded-lg border border-muted bg-background
					transition-all duration-150 hover:bg-secondary dark:border-white/8"
			/>
		);
	}

	const handleClick = () => {
		setTheme(isDark ? 'light' : 'dark');
	};

	return (
		<button
			className={cn(
				`group grid size-8 cursor-pointer place-items-center rounded-lg border
				border-muted text-muted-foreground transition-all duration-150
				focus-within:text-primary hover:border-border hover:bg-secondary
				hover:text-primary dark:border-white/8`,
				className,
			)}
			{...props}
			onClick={handleClick}
		>
			{isDark ?
				<Moon className="size-4" />
			:	<Sun className="size-4" />}
		</button>
	);
}
