import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful';
import type { TypeCategoriesSkeleton } from './TypeCategories';

/**
 * Fields type definition for content type 'TypeInformation'
 * @name TypeInformationFields
 * @type {TypeInformationFields}
 * @memberof TypeInformation
 */
export interface TypeInformationFields {
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
     * Field type definition for field 'publishedAt' (published_at)
     * @name published_at
     * @localized false
     */
    publishedAt: EntryFieldTypes.Date;
    /**
     * Field type definition for field 'category' (category)
     * @name category
     * @localized false
     */
    category: EntryFieldTypes.EntryLink<TypeCategoriesSkeleton>;
    /**
     * Field type definition for field 'content' (content)
     * @name content
     * @localized false
     */
    content: EntryFieldTypes.RichText;
}

/**
 * Entry skeleton type definition for content type 'information' (information)
 * @name TypeInformationSkeleton
 * @type {TypeInformationSkeleton}
 * @author 6QMVqZ7la3hDeOztKRCpE4
 * @since 2023-05-13T05:07:56.570Z
 * @version 7
 */
export type TypeInformationSkeleton = EntrySkeletonType<TypeInformationFields, 'information'>;
/**
 * Entry type definition for content type 'information' (information)
 * @name TypeInformation
 * @type {TypeInformation}
 * @author 6QMVqZ7la3hDeOztKRCpE4
 * @since 2023-05-13T05:07:56.570Z
 * @version 7
 */
export type TypeInformation<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
    TypeInformationSkeleton,
    Modifiers,
    Locales
>;

export function isTypeInformation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
    entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeInformation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'information';
}
