import * as z from "zod";

import { BurstRecoverBattery, BurstRecoverBatterySchema } from "./burst-recover-battery";

/** バッテリー減少 */
export type BatteryDrain = BurstRecoverBattery & Readonly<{
  type: "BatteryDrain";
  /** 相手のバッテリー減少量 */
  batteryDecrease: number;
  /** 相手のバッテリー減少の継続ターン数 */
  duration: number;
}>;

/** BatteryDrain zodスキーマ */
export const BatteryDrainSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("BatteryDrain"),
  batteryDecrease: z.number(),
  duration: z.number(),
});
