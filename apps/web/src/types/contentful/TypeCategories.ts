import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful';

/**
 * Fields type definition for content type 'TypeCategories'
 * @name TypeCategoriesFields
 * @type {TypeCategoriesFields}
 * @memberof TypeCategories
 */
export interface TypeCategoriesFields {
    /**
     * Field type definition for field 'name' (name)
     * @name name
     * @localized false
     */
    name: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'color' (color)
     * @name color
     * @localized false
     */
    color: EntryFieldTypes.Symbol<
        'primary' | 'primary.dark' | 'primary.light' | 'secondary' | 'secondary.dark' | 'secondary.light'
    >;
}

/**
 * Entry skeleton type definition for content type 'categories' (categories)
 * @name TypeCategoriesSkeleton
 * @type {TypeCategoriesSkeleton}
 * @author 6QMVqZ7la3hDeOztKRCpE4
 * @since 2023-05-13T05:11:12.600Z
 * @version 13
 */
export type TypeCategoriesSkeleton = EntrySkeletonType<TypeCategoriesFields, 'categories'>;
/**
 * Entry type definition for content type 'categories' (categories)
 * @name TypeCategories
 * @type {TypeCategories}
 * @author 6QMVqZ7la3hDeOztKRCpE4
 * @since 2023-05-13T05:11:12.600Z
 * @version 13
 */
export type TypeCategories<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
    TypeCategoriesSkeleton,
    Modifiers,
    Locales
>;

export function isTypeCategories<Modifiers extends ChainModifiers, Locales extends LocaleCode>(
    entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeCategories<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'categories';
}
