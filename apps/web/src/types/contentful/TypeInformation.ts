import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful';
import type { TypeCategoriesSkeleton } from './TypeCategories';

export interface TypeInformationFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    publishedAt: EntryFieldTypes.Date;
    category: EntryFieldTypes.EntryLink<TypeCategoriesSkeleton>;
    content: EntryFieldTypes.RichText;
}

export type TypeInformationSkeleton = EntrySkeletonType<TypeInformationFields, 'information'>;
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
