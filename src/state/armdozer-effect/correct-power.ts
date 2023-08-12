import { z } from "zod";

import { EffectPeriod, EffectPeriodSchema } from "./effect-period";

/** 攻撃力補正 */
export type CorrectPower = Readonly<{
  type: "CorrectPower";
  /** 攻撃力補正値 */
  power: number;
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** CorrectPower zodスキーマ */
export const CorrectPowerSchema = z.object({
  type: z.literal("CorrectPower"),
  power: z.number(),
  period: EffectPeriodSchema,
});

/**
 * 任意オブジェクトをCorrectPowerにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseCorrectPower = (origin: unknown): CorrectPower | null => {
  const result = CorrectPowerSchema.safeParse(origin);
  return result.success ? result.data : null;
};
