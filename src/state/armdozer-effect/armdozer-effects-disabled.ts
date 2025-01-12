import { z } from "zod";

import { EffectPeriod, EffectPeriodSchema } from "./effect-period";

/** アームドーザ効果無効 */
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
