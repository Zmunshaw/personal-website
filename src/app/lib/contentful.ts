import { createClient, ContentfulClientApi } from 'contentful';
import { getCloudflareContext } from '@opennextjs/cloudflare';

let cachedClient: ContentfulClientApi<undefined> | null = null;

export function getContentfulClient(): ContentfulClientApi<undefined> {
    // Return cached client if available
    if (cachedClient) {
        return cachedClient;
    }

    let space: string | undefined;
    let accessToken: string | undefined;

    // First, try to get from process.env (local development)
    space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

    // If not found in process.env, try Cloudflare context (production)
    if (!space || !accessToken) {
        try {
            const { env } = getCloudflareContext();
            space = env.CONTENTFUL_SPACE_ID;
            accessToken = env.CONTENTFUL_ACCESS_TOKEN;
        } catch (error) {
            // getCloudflareContext() will fail in development mode, which is expected
        }
    }

    if (!space || !accessToken) {
        throw new Error('Contentful credentials not found. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN (Cloudflare) or NEXT_PUBLIC_CONTENTFUL_SPACE_ID and NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN (local development).');
    }

    cachedClient = createClient({
        space,
        accessToken,
    });

    return cachedClient;
}

// Export a getter function instead of the client directly
export const contentfulClient = {
    getEntries: (...args: Parameters<ContentfulClientApi<undefined>['getEntries']>) =>
        getContentfulClient().getEntries(...args),
    getEntry: (...args: Parameters<ContentfulClientApi<undefined>['getEntry']>) =>
        getContentfulClient().getEntry(...args),
    getAsset: (...args: Parameters<ContentfulClientApi<undefined>['getAsset']>) =>
        getContentfulClient().getAsset(...args),
    getAssets: (...args: Parameters<ContentfulClientApi<undefined>['getAssets']>) =>
        getContentfulClient().getAssets(...args),
};
