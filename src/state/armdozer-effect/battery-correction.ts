import { z } from "zod";

import { EffectPeriod, EffectPeriodSchema } from "./effect-period";

/** バッテリー補正 */
export type BatteryCorrection = Readonly<{
  type: "BatteryCorrection";
  /** バッテリー補正値 */
  batteryCorrection: number;
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** BatteryCorrection zodスキーマ */
export const BatteryCorrectionSchema = z.object({
  type: z.literal("BatteryCorrection"),
  batteryCorrection: z.number(),
  period: EffectPeriodSchema,
});
