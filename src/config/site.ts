export const siteConfig = {
	name: 'Yorno',
	description:
		'Create events, share invitation links, and manage reservations with a modern RSVP platform built for communities, creators, and gatherings.',
	url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
	ogImage: '/og-image.png',
} as const;

export type SiteConfig = typeof siteConfig;
