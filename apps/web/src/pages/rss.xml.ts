import rss, { RSSOptions } from '@astrojs/rss';
import { contentfulClient } from '../lib/contentful';
import type { TypeConcertSkeleton, TypeInformationSkeleton } from '../types/contentful';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

export async function get(context: RSSOptions) {
    const [{ items: informations }, { items: concerts }] = await Promise.all([
        contentfulClient.withoutUnresolvableLinks.getEntries<TypeInformationSkeleton>({
            content_type: 'information',
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
            ...informations.map(({ fields: information }) => ({
                title: information.title,
                pubDate: new Date(information.publishedAt),
                content: documentToPlainTextString(information.content),
                link: `/information/${information.slug}`,
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
