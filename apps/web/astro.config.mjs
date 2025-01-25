import mdx from '@astrojs/mdx';
import { defineConfig, envField } from 'astro/config';

import sitemap from '@astrojs/sitemap';
// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.nordenwinds.com',
    integrations: [mdx(), sitemap(), tailwind()],
    env: {
        schema: {
            CONTENTFUL_ENV: envField.enum({
                context: 'server',
                access: 'public',
                values: ['develop', 'master'],
                default: 'develop',
            }),
            CONTENTFUL_SPACE_ID: envField.string({ context: 'server', access: 'public' }),
            CONTENTFUL_DELIVERY_TOKEN: envField.string({ context: 'server', access: 'secret' }),
            CONTENTFUL_PREVIEW_TOKEN: envField.string({ context: 'server', access: 'secret' }),
            API_BASE_URL: envField.string({ context: 'client', access: 'public' }),
        },
    },
});
