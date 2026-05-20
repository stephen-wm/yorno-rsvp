import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		background_color: '#121216',
		categories: ['events', 'productivity', 'social'],
		description:
			'Create events, share invitation links, and manage reservations with a modern RSVP platform built for communities, creators, and gatherings.',
		display: 'standalone',
		icons: [
			{
				purpose: 'maskable',
				sizes: '192x192',
				src: '/icon-192.png',
				type: 'image/png',
			},
			{
				purpose: 'any',
				sizes: '512x512',
				src: '/icon-512.png',
				type: 'image/png',
			},
			{
				sizes: '180x180',
				src: '/apple-icon.png',
				type: 'image/png',
			},
			{
				purpose: 'any',
				sizes: 'any',
				src: '/icon.svg',
				type: 'image/svg+xml',
			},
		],
		name: 'Yorno',
		orientation: 'portrait-primary',
		screenshots: [
			{
				form_factor: 'wide',
				label: 'Yorno dashboard — kanban board view',
				sizes: '1280x800',

				src: '/screenshots/dashboard.png',
				type: 'image/png',
			},
			{
				form_factor: 'narrow',
				label: 'Yorno on mobile',
				sizes: '390x844',

				src: '/screenshots/mobile.png',
				type: 'image/png',
			},
		],
		short_name: 'Yorno',
		start_url: '/',
		theme_color: '#432DD7',
	};
}
