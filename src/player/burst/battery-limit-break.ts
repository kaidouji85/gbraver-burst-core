import { z } from "zod";

import {
  BurstRecoverBattery,
  BurstRecoverBatterySchema,
} from "./burst-recover-battery";

/** バッテリーリミットブレイク */
export type BatteryLimitBreak = BurstRecoverBattery &
  Readonly<{
    type: "BatteryLimitBreak";
    /** バースト後の最大バッテリー */
    maxBattery: number;
  }>;

/** BatteryLimitBreak zodスキーマ */
export const BatteryLimitBreakSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("BatteryLimitBreak"),
  maxBattery: z.number(),
});
