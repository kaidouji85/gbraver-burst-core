import { z } from "zod";

import { EffectPeriod, EffectPeriodSchema } from "./effect-period";

/** 攻撃力補正半減 */
export type HalveCorrectPower = Readonly<{
  type: "HalveCorrectPower";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** HalveCorrectPower zodスキーマ */
export const HalveCorrectPowerSchema = z.object({
  type: z.literal("HalveCorrectPower"),
  period: EffectPeriodSchema,
});

/**
 * 任意オブジェクトをHalveCorrectPowerにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseHalveCorrectPower = (
  origin: unknown,
): HalveCorrectPower | null => {
  const result = HalveCorrectPowerSchema.safeParse(origin);
  return result.success ? result.data : null;
};
