import { z } from "zod";

import { EffectPeriod, EffectPeriodSchema } from "./effect-period";

/** ターン開始時バッテリー回復量の補正 */
export type TurnStartBatteryCorrect = {
  type: "TurnStartBatteryCorrect";
  /** バッテリー補正値 */
  correctBattery: number;
  /** エフェクト有効期間 */
  period: EffectPeriod;
};

/** TurnStartBatteryCorrect zodスキーマ */
export const TurnStartBatteryCorrectSchema = z.object({
  type: z.literal("TurnStartBatteryCorrect"),
  correctBattery: z.number(),
  period: EffectPeriodSchema,
});
