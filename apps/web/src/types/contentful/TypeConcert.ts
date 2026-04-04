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

export function isTypeConcert<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: unknown): entry is TypeConcert<Modifiers, Locales> {
    const candidate = entry as { sys?: { contentType?: { sys?: { id?: string } } } };
    return candidate.sys?.contentType?.sys?.id === 'concert'
}
