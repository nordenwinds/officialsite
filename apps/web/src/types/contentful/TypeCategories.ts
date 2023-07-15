import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful';

export interface TypeCategoriesFields {
    name: EntryFieldTypes.Symbol;
    color: EntryFieldTypes.Symbol<
        'primary' | 'primary.dark' | 'primary.light' | 'secondary' | 'secondary.dark' | 'secondary.light'
    >;
}

export type TypeCategoriesSkeleton = EntrySkeletonType<TypeCategoriesFields, 'categories'>;
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
