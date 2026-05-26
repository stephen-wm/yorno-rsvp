import { type NextRequest, NextResponse } from 'next/server';

import arcjet, { detectBot, shield } from '@/lib/arcjet';

const aj = arcjet.withRule(shield({ mode: 'LIVE' })).withRule(
	detectBot({
		mode: 'LIVE',
		allow: [
			// Allow search engine indexing
			'CATEGORY:SEARCH_ENGINE',
			// Allow link preview bots (Slack, Twitter, etc.)
			'CATEGORY:PREVIEW',
		],
	}),
);

export async function proxy(request: NextRequest) {
	const decision = await aj.protect(request);

	if (decision.isDenied() && decision.reason.isBot()) {
		return NextResponse.json({ error: 'No bots allowed' }, { status: 403 });
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico|healthz).*)'],
};
