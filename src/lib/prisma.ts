import { PrismaClient } from '@/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import 'dotenv/config';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	throw new Error('Cannot find `DATABASE_URL` environment variable');
}

const adapter = new PrismaNeon({
	connectionString: DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });
