import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful';

/**
 * Fields type definition for content type 'TypeConcert'
 * @name TypeConcertFields
 * @type {TypeConcertFields}
 * @memberof TypeConcert
 */
export interface TypeConcertFields {
    /**
     * Field type definition for field 'flyer' (flyer)
     * @name flyer
     * @localized false
     */
    flyer: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'title' (title)
     * @name title
     * @localized false
     */
    title: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'slug' (slug)
     * @name slug
     * @localized false
     */
    slug: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'startTime' (startTime)
     * @name startTime
     * @localized false
     */
    startTime: EntryFieldTypes.Date;
    /**
     * Field type definition for field 'openTime' (openTime)
     * @name openTime
     * @localized false
     */
    openTime?: EntryFieldTypes.Date;
    /**
     * Field type definition for field 'conductor' (conductor)
     * @name conductor
     * @localized false
     */
    conductor: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'place' (place)
     * @name place
     * @localized false
     */
    place?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'content' (content)
     * @name content
     * @localized false
     */
    content: EntryFieldTypes.RichText;
}

/**
 * Entry skeleton type definition for content type 'concert' (concert)
 * @name TypeConcertSkeleton
 * @type {TypeConcertSkeleton}
 * @author 6QMVqZ7la3hDeOztKRCpE4
 * @since 2023-06-17T08:24:16.746Z
 * @version 5
 */
export type TypeConcertSkeleton = EntrySkeletonType<TypeConcertFields, 'concert'>;
/**
 * Entry type definition for content type 'concert' (concert)
 * @name TypeConcert
 * @type {TypeConcert}
 * @author 6QMVqZ7la3hDeOztKRCpE4
 * @since 2023-06-17T08:24:16.746Z
 * @version 5
 */
export type TypeConcert<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
    TypeConcertSkeleton,
    Modifiers,
    Locales
>;

export function isTypeConcert<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
    entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeConcert<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'concert';
}
