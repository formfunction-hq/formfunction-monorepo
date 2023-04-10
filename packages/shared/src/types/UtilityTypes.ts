/**
 * This file provides common helpful utility types.
 */

export type Maybe<T> = T | null;
export type Undef<T> = T | undefined;
export type MaybeUndef<T> = T | null | undefined;
export type Common<A, B> = {
  [P in keyof A & keyof B]?: A[P] | B[P];
};
export type AtLeastOne<T> = [T, ...Array<T>];
export type Resolved<T> = T extends Promise<infer U> ? U : never;
