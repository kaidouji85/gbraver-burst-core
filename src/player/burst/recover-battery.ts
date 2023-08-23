import { z } from "zod";

import {
  BurstRecoverBattery,
  BurstRecoverBatterySchema,
} from "./burst-recover-battery";

/** バッテリー回復 */
export type RecoverBattery = BurstRecoverBattery &
  Readonly<{
    type: "RecoverBattery";
  }>;

/** RecoverBattery zodスキーマ */
export const RecoverBatterySchema = BurstRecoverBatterySchema.extend({
  type: z.literal("RecoverBattery"),
});
