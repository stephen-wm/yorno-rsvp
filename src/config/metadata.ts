import { type Metadata } from 'next';

export const baseMetadata: Metadata = {
	applicationName: 'Yorno',
	authors: [{ name: 'Yorno' }],
	creator: 'Yorno',
	category: 'Events',
	metadataBase: `https://${process.env.NEXT_PUBLIC_APP_URL}`,

	icons: {
		apple: [{ sizes: '180x180', url: '/apple-icon.png' }],
		icon: [
			{ type: 'image/x-icon', sizes: 'any', url: '/favicon.ico' },
			{ type: 'image/svg+xml', sizes: 'any', url: '/icon.svg' },
			{ type: 'image/png', sizes: '192x192', url: '/icon-192.png' },
			{ type: 'image/png', sizes: '512x512', url: '/icon-512.png' },
		],
	},

	manifest: '/manifest.webmanifest',

	keywords: [
		'Yorno',
		'yorno RSVP',
		'event management platform',
		'RSVP app',
		'event planning tool',
		'invite link generator',
		'event invitation system',
		'guest management software',
		'attendance tracking app',
		'social event organizer',
		'community event platform',
		'group event planning',
		'party invitation app',
		'birthday invite app',
		'event RSVP tracker',
		'event coordination tool',
		'modern event platform',
		'link-based invitations',
		'event hosting software',
		'meetup planning tool',
		'creator event platform',
		'private event invitations',
		'free RSVP system',
		'alternative to Eventbrite',
		'alternative to Partiful',
		'alternative to Calendly',
	],

	robots: {
		follow: true,
		index: true,
		googleBot: {
			follow: true,
			index: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},

	title: {
		default: 'Yorno',
		template: '%s | Yorno',
	},

	description:
		'Create events, share invitation links, and manage reservations with a modern RSVP platform built for communities, creators, and gatherings.',
	// description:
	// 'Yorno is a modern event and RSVP platform for creating events, sharing invitation links, and managing attendance effortlessly.',

	openGraph: {
		siteName: 'Yorno',
		type: 'website',
		locale: 'en_US',
		url: 'https://yorno.rsvp',
		title: 'Yorno — Invite everyone, tracking everything',
		description:
			'Create events, share invite links, and manage reservations with ease.',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Yorno — Invite everyone, tracking everything',
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		creator: '@yorno',
		title: 'Yorno — Invite everyone, tracking everything.',
		description:
			'Create events, share invite links, and manage reservations with ease.',
		images: ['/og-image.png'],
	},
};
