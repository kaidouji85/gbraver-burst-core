import { z } from "zod";

import {
  BurstRecoverBattery,
  BurstRecoverBatterySchema,
} from "./burst-recover-battery";

/** 攻撃力バフ */
export type BuffPower = BurstRecoverBattery &
  Readonly<{
    type: "BuffPower";
    /** 攻撃力アップ */
    buffPower: number;
    /** バフ継続ターン数 */
    duration: number;
  }>;

/** BuffPower zodスキーマ */
export const BuffPowerSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("BuffPower"),
  buffPower: z.number(),
  duration: z.number(),
});
