import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.nordenwinds.com',
    integrations: [mdx(), sitemap()],

    env: {
        schema: {
            CONTENTFUL_ENV: envField.enum({
                context: 'server',
                access: 'public',
                values: ['develop', 'master'],
                default: 'develop',
            }),
            CONTENTFUL_SPACE_ID: envField.string({ context: 'server', access: 'public' }),
            CONTENTFUL_DELIVERY_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
            CONTENTFUL_PREVIEW_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
            API_BASE_URL: envField.string({ context: 'client', access: 'public' }),
        },
    },

    vite: {
        plugins: [tailwindcss()],
    },
});
