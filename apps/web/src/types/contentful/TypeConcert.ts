import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeConcertFields {
    title: EntryFieldTypes.Symbol;
    flyer: EntryFieldTypes.AssetLink;
    slug: EntryFieldTypes.Symbol;
    startTime: EntryFieldTypes.Date;
    openTime?: EntryFieldTypes.Date;
    conductor: EntryFieldTypes.Symbol;
    place: EntryFieldTypes.Symbol;
    content: EntryFieldTypes.RichText;
}

export type TypeConcertSkeleton = EntrySkeletonType<TypeConcertFields, "concert">;
export type TypeConcert<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeConcertSkeleton, Modifiers, Locales>;

export function isTypeConcert<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeConcert<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'concert'
}
