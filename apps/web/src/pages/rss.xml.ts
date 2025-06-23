import type { RSSOptions } from '@astrojs/rss';
import rss from '@astrojs/rss';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { contentfulClient } from '../lib/contentful';
import type { TypeConcertSkeleton, TypeNewsSkeleton } from '../types/contentful';

export async function get(context: RSSOptions) {
    const [{ items: newses }, { items: concerts }] = await Promise.all([
        contentfulClient.withoutUnresolvableLinks.getEntries<TypeNewsSkeleton>({
            content_type: 'news',
            order: ['-fields.publishedAt'],
        }),
        contentfulClient.withoutUnresolvableLinks.getEntries<TypeConcertSkeleton>({
            content_type: 'concert',
            order: ['-fields.startTime'],
        }),
    ]);

    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site,
        items: [
            ...newses.map(({ fields: news }) => ({
                title: news.title,
                pubDate: new Date(news.publishedAt),
                content: documentToPlainTextString(news.content),
                link: `/news/${news.slug}`,
            })),
            ...concerts.map(({ fields: concert }) => ({
                title: concert.title,
                pubDate: new Date(concert.startTime),
                content: documentToPlainTextString(concert.content),
                link: `/concerts/${concert.slug}`,
            })),
        ],
        stylesheet: 'https://raw.githubusercontent.com/genmon/aboutfeeds/main/tools/pretty-feed-v3.xsl',
    });
}
