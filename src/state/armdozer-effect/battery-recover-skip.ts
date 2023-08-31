import { z } from "zod";

import { EffectPeriod, EffectPeriodSchema } from "./effect-period";

/** ターン開始時のバッテリー回復をスキップ */
export type BatteryRecoverSkip = Readonly<{
  type: "BatteryRecoverSkip";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** BatteryRecoverSkip zodスキーマ */
export const BatteryRecoverSkipSchema = z.object({
  type: z.literal("BatteryRecoverSkip"),
  period: EffectPeriodSchema,
});
