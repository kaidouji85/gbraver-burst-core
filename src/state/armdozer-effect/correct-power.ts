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
