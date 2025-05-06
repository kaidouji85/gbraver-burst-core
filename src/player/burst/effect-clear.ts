import { z } from "zod";

import {
  BurstRecoverBattery,
  BurstRecoverBatterySchema,
} from "./burst-recover-battery";

/** 効果クリア */
export type EffectClear = BurstRecoverBattery & {
  type: "EffectClear";
};

/** EffectClear zodスキーマ */
export const EffectClearSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("EffectClear"),
});
