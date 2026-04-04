import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeVersionTrackingFields {
    version: EntryFieldTypes.Number;
}

export type TypeVersionTrackingSkeleton = EntrySkeletonType<TypeVersionTrackingFields, "versionTracking">;
export type TypeVersionTracking<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeVersionTrackingSkeleton, Modifiers, Locales>;

export function isTypeVersionTracking<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: unknown): entry is TypeVersionTracking<Modifiers, Locales> {
    const candidate = entry as { sys?: { contentType?: { sys?: { id?: string } } } };
    return candidate.sys?.contentType?.sys?.id === 'versionTracking'
}
