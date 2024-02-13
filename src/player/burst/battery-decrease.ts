import * as z from "zod";

import { BurstRecoverBattery, BurstRecoverBatterySchema } from "./burst-recover-battery";

/** バッテリー減少 */
export type BatteryDecrease = BurstRecoverBattery & Readonly<{
  type: "BatteryDecrease";
  /** 相手のバッテリー減少量 */
  batteryDecrease: number;
  /** 相手のバッテリー減少の継続ターン数 */
  duration: number;
}>;

/** BatteryDecrease zodスキーマ */
export const BatteryDecreaseSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("BatteryDecrease"),
  batteryDecrease: z.number(),
  duration: z.number(),
});
