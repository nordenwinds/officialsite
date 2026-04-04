import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCategorySkeleton } from "./TypeCategory";

export interface TypeNewsFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    publishedAt: EntryFieldTypes.Date;
    category: EntryFieldTypes.EntryLink<TypeCategorySkeleton>;
    content: EntryFieldTypes.RichText;
}

export type TypeNewsSkeleton = EntrySkeletonType<TypeNewsFields, "news">;
export type TypeNews<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNewsSkeleton, Modifiers, Locales>;

export function isTypeNews<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: unknown): entry is TypeNews<Modifiers, Locales> {
    const candidate = entry as { sys?: { contentType?: { sys?: { id?: string } } } };
    return candidate.sys?.contentType?.sys?.id === 'news'
}
