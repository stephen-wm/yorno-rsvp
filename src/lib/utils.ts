import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(new Date(date));
}

export function slugify(text: string): string {
	return (
		text
			.normalize('NFKD')
			.replaceAll(/[^\p{Letter}\p{Number}\s-]/gu, '')
			.trim()
			.replaceAll(/[\s_-]+/g, '-')
			// eslint-disable-next-line sonarjs/slow-regex
			.replaceAll(/^-+|-+$/g, '')
			.toLowerCase()
	);
}
