// Intentionally minimal — edge runtime only
type Level = 'debug' | 'error' | 'info' | 'warn';

const levels: Record<Level, number> = {
	debug: 10,
	info: 20,
	warn: 30,
	error: 40,
};

const minLevel: number =
	process.env.NODE_ENV === 'production' ? levels.info : levels.debug;

function log(level: Level, msg: string, data?: Record<string, unknown>) {
	if (levels[level as Level] < minLevel) return;

	const entry = JSON.stringify({
		level,
		msg,
		env: process.env.NODE_ENV,
		...data,
		time: Date.now(),
	});

	// console methods map to Vercel log levels correctly
	if (level === 'error') console.error(entry);
	else if (level === 'warn') console.warn(entry);
	else console.log(entry);
}

export const edgeLogger = {
	debug: (msg: string, data?: Record<string, unknown>) =>
		log('debug', msg, data),
	info: (msg: string, data?: Record<string, unknown>) => log('info', msg, data),
	warn: (msg: string, data?: Record<string, unknown>) => log('warn', msg, data),
	error: (msg: string, data?: Record<string, unknown>) =>
		log('error', msg, data),
};
