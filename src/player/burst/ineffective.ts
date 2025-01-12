import { z } from "zod";

import {
  BurstRecoverBattery,
  BurstRecoverBatterySchema,
} from "./burst-recover-battery";

/** 効果無効 */
export type Ineffective = BurstRecoverBattery &
  Readonly<{
    type: "Ineffective";
  }>;

/** Ineffective zodスキーマ */
export const IneffectiveSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("Ineffective"),
});
