import { z } from "zod";

import { EffectPeriod, EffectPeriodSchema } from "./effect-period";

/**
 * 何もしない効果
 * 全ての効果か本タイプのプロパティを持つこと
 */
export type EmptyArmdozerEffect = Readonly<{
  /** 効果判別用のプロパティ */
  type: "Empty";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** EmptyArmdozerEffect zodスキーマ */
export const EmptyArmdozerEffectSchema = z.object({
  type: z.literal("Empty"),
  period: EffectPeriodSchema,
});
