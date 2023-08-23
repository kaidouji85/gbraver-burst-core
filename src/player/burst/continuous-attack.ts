import { z } from "zod";

import {
  BurstRecoverBattery,
  BurstRecoverBatterySchema,
} from "./burst-recover-battery";

/** 連続攻撃 */
export type ContinuousAttack = BurstRecoverBattery &
  Readonly<{
    type: "ContinuousAttack";
  }>;

/** ContinuousAttack zodスキーマ */
export const ContinuousAttackSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("ContinuousAttack"),
});
