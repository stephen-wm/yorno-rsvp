import pino from 'pino';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

export const logger = pino({
	level: isProd ? 'info' : 'debug',

	// pretty-print in development for readability
	// revert to raw JSON in production for log aggregation
	transport:
		isDev ?
			{
				target: 'pino-pretty',
				options: {
					colorize: true,
					ignore: 'pid, hostname',
					translateTime: 'SYS:HH:MM:ss',
				},
			}
		:	undefined,

	// base fields included in every log line
	base: {
		env: process.env.NODE_ENV,
		// don't include pid/hostname
		pid: undefined,
		hostname: undefined,
	},

	// redact sensitive fields wherever they appear in the log object
	redact: {
		paths: [
			'password',
			'token',
			'secret',
			'authorization',
			'*.token',
			'*.secret',
			'req.headers.authorization',
			'req.headers.cookie',
		],
		censor: '[Redacted]',
	},
});
