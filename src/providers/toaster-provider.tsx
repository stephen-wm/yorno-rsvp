'use client';

import { useTheme } from 'next-themes';
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';

interface ToasterProviderProps {
	id?: string;
}

export function ToasterProvider({
	id,
	...props
}: Readonly<ToasterProviderProps>) {
	const { resolvedTheme } = useTheme();

	return (
		<SonnerToaster
			closeButton
			id={id}
			richColors
			theme={resolvedTheme as ToasterProps['theme']}
			{...props}
		/>
	);
}
