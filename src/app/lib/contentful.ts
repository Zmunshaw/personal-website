import { createClient } from 'contentful';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export function getContentfulClient() {
    try {
        // Try to get Cloudflare environment variables
        const { env } = getCloudflareContext();

        if (!env.CONTENTFUL_SPACE) {
            throw new Error('CONTENTFUL_SPACE is not defined in Cloudflare environment');
        }

        if (!env.CONTENTFUL_ACCESS_TOKEN) {
            throw new Error('CONTENTFUL_ACCESS_TOKEN is not defined in Cloudflare environment');
        }

        return createClient({
            space: env.CONTENTFUL_SPACE,
            accessToken: env.CONTENTFUL_ACCESS_TOKEN,
        });
    } catch (error) {
        // Fallback for development with process.env
        if (process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID && process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
            return createClient({
                space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
                accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
            });
        }
        throw error;
    }
}

export const contentfulClient = getContentfulClient();
