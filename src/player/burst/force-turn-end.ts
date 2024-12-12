import * as z from "zod";

import {
  BurstRecoverBattery,
  BurstRecoverBatterySchema,
} from "./burst-recover-battery";

/** 強制ターンエンド */
export type ForceTurnEnd = BurstRecoverBattery &
  Readonly<{
    type: "ForceTurnEnd";
  }>;

/** ForceTurnEnd zodスキーマ */
export const ForceTurnEndSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("ForceTurnEnd"),
});
