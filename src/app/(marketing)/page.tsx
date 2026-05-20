import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { createMetadata } from '@/lib/create-metadata';

export const metadata: Metadata = createMetadata({
	title: 'Invite everyone, track everything',
	description: 'Create events, share invite links, and manage RSVPs with ease.',
});

export default function Home() {
	return (
		<div
			className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans
				dark:bg-black"
		>
			<main
				className="flex w-full max-w-full flex-1 flex-col items-center justify-center bg-white px-16
					py-32 dark:bg-black"
			>
				<div className="grid place-items-center gap-4 text-center">
					<Link href="/">
						<Image
							alt="Yorno logo"
							className="block transition-opacity duration-150 hover:opacity-75 dark:hidden"
							height={0}
							loading="eager"
							priority
							src="/logos/yorno-primary.svg"
							style={{ height: 'auto', width: '135px' }}
							width={0}
						/>
						<Image
							alt="Yorno logo"
							className="hidden transition-opacity duration-150 hover:opacity-75 dark:block"
							height={0}
							loading="eager"
							priority
							src="/logos/yorno-outline.svg"
							style={{ height: 'auto', width: '135px' }}
							width={0}
						/>
					</Link>

					<p className="w-full text-base text-balance text-muted-foreground lg:max-w-lg">
						Currently under construction, visit the{' '}
						<Link
							className="underline decoration-transparent underline-offset-8 transition-all
								duration-150 hover:text-primary hover:decoration-primary hover:underline-offset-4
								dark:text-white dark:hover:decoration-white"
							href="https://github.com/stephen-wm/yorno-rsvp#readme"
							rel="noreferrer noopener"
							target="_blank"
						>
							GitHub repository
						</Link>{' '}
						to learn more.
					</p>
				</div>
			</main>
		</div>
	);
}
