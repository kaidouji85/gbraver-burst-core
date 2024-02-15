import * as z from "zod";

import {
  BurstRecoverBattery,
  BurstRecoverBatterySchema,
} from "./burst-recover-battery";

/** バッテリー減少 */
export type BatteryDrain = BurstRecoverBattery &
  Readonly<{
    type: "BatteryDrain";
    /** 相手のバッテリー減少量、-2などマイナスで指定する */
    batteryDecrease: number;
  }>;

/** BatteryDrain zodスキーマ */
export const BatteryDrainSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("BatteryDrain"),
  batteryDecrease: z.number(),
  duration: z.number(),
});
