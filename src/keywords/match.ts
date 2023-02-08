import { panic } from "../index.js";

type ObjectKey = string | symbol | number;

export type UnionRecord<TTagKey extends ObjectKey> = Record<TTagKey, ObjectKey>;

export const match =
  <TUnion extends UnionRecord<TTagKey>, TTagKey extends keyof TUnion>(
    input: TUnion,
    tagKey: TTagKey
  ) =>
  <TBranches extends MatchBranches<TUnion, TTagKey>>(
    branches: TBranches
  ): MatchOutput<TUnion, TTagKey, TBranches> => {
    const tag = input[tagKey];
    const branchForTag = branches[tag];
    if (!branchForTag) {
      panic(`match branch missing for ${String(tagKey)} = ${String(tag)}`);
    }
    return (
      // I don't like this type cast, but I can't find a better way that
      // satisfies both eslint and TypeScript.
      (
        branchForTag as (
          input: TUnion
        ) => MatchOutput<TUnion, TTagKey, TBranches>
      )(input)
    );
  };

export type MatchBranches<
  TUnion extends UnionRecord<TTagKey>,
  TTagKey extends keyof TUnion,
  TReturn = unknown
> = {
  [TagValue in TUnion[TTagKey]]: (
    value: VariantForTag<TUnion, TTagKey, TagValue>
  ) => TReturn;
};

export type VariantForTag<
  TUnion extends UnionRecord<TTagKey>,
  TTagKey extends keyof TUnion,
  TTagValue extends TUnion[TTagKey]
> = Extract<
  TUnion,
  {
    [TagKey in TTagKey]: TTagValue;
  }
>;

export type MatchOutput<
  TUnion extends UnionRecord<TTagKey>,
  TTagKey extends keyof TUnion,
  TBranches extends MatchBranches<TUnion, TTagKey>
> = ReturnType<TBranches[keyof TBranches]>;
