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

/**
 * 任意オブジェクトをDamageHalvedにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseDamageHalved = (origin: unknown): DamageHalved | null => {
  const result = DamageHalvedSchema.safeParse(origin);
  return result.success ? result.data : null;
};
