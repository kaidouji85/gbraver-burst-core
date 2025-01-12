import { z } from "zod";

import { EffectPeriod, EffectPeriodSchema } from "./effect-period";

/** 戦闘中にアームドーザ効果が無効となる */
export type ArmdozerEffectsDisabled = Readonly<{
  type: "ArmdozerEffectsDisabled";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** ArmdozerEffectsDisabled zodスキーマ */
export const ArmdozerEffectsDisabledSchema = z.object({
  type: z.literal("ArmdozerEffectsDisabled"),
  period: EffectPeriodSchema,
});
