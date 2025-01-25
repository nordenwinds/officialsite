import { CONTENTFUL_DELIVERY_TOKEN, CONTENTFUL_ENV, CONTENTFUL_PREVIEW_TOKEN, CONTENTFUL_SPACE_ID } from 'astro:env/server';
import * as contentful from 'contentful';

export const contentfulClient = contentful.createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.DEV ? CONTENTFUL_PREVIEW_TOKEN : CONTENTFUL_DELIVERY_TOKEN,
    host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
    environment: CONTENTFUL_ENV,
});
