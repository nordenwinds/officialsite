import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeVersionTrackingFields {
    version: EntryFieldTypes.Number;
}

export type TypeVersionTrackingSkeleton = EntrySkeletonType<TypeVersionTrackingFields, "versionTracking">;
export type TypeVersionTracking<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeVersionTrackingSkeleton, Modifiers, Locales>;

export function isTypeVersionTracking<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeVersionTracking<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'versionTracking'
}
