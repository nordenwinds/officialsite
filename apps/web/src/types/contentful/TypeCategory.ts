import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCategoryFields {
    name: EntryFieldTypes.Symbol;
    color: EntryFieldTypes.Symbol<"primary" | "primary.dark" | "primary.light" | "secondary" | "secondary.dark" | "secondary.light">;
}

export type TypeCategorySkeleton = EntrySkeletonType<TypeCategoryFields, "category">;
export type TypeCategory<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCategorySkeleton, Modifiers, Locales>;

export function isTypeCategory<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: unknown): entry is TypeCategory<Modifiers, Locales> {
    const candidate = entry as { sys?: { contentType?: { sys?: { id?: string } } } };
    return candidate.sys?.contentType?.sys?.id === 'category'
}
