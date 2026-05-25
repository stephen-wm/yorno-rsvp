import arcjet from '@arcjet/next';

// Re-export the rules to simplify imports inside handlers
export {
	detectBot,
	detectPromptInjection,
	fixedWindow,
	protectSignup,
	sensitiveInfo,
	shield,
	slidingWindow,
	tokenBucket,
} from '@arcjet/next';

const arcjetKey = process.env.ARCJET_KEY;

if (!arcjetKey) {
	throw new Error('Cannot find `ARCJET_KEY` environment variable');
}

// Create a base Arcjet instance to use by each handler
export default arcjet({
	key: arcjetKey,
	rules: [],
});
