import type { Metadata } from 'next/types';

import { baseMetadata } from '@/config/metadata';

export const createMetadata = (overrides: Metadata = {}): Metadata => {
	return {
		...baseMetadata,
		...overrides,
		openGraph: {
			...baseMetadata.openGraph,
			...overrides.openGraph,
		},
		twitter: {
			...baseMetadata.twitter,
			...overrides.twitter,
		},
	};
};

export const authMetadata = (title: string) =>
	createMetadata({
		title,
		robots: {
			index: false,
			follow: false,
		},
	});
