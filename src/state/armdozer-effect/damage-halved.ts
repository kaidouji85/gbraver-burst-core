import { z } from "zod";

import { EffectPeriod, EffectPeriodSchema } from "./effect-period";

/** ダメージ半減 */
export type DamageHalved = Readonly<{
  type: "DamageHalved";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** DamageHalved zodスキーマ */
export const DamageHalvedSchema = z.object({
  type: z.literal("DamageHalved"),
  period: EffectPeriodSchema,
});
