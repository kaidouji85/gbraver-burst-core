import { z } from "zod";

import {
  BurstRecoverBattery,
  BurstRecoverBatterySchema,
} from "./burst-recover-battery";

/** 電撃バリア */
export type LightningBarrier = BurstRecoverBattery &
  Readonly<{
    type: "LightningBarrier";
    /** 電撃ダメージ */
    damage: number;
    /** バリア継続ターン数 */
    duration: number;
  }>;

/** LightningBarrier zodスキーマ */
export const LightningBarrierSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("LightningBarrier"),
  damage: z.number(),
  duration: z.number(),
});

/**
 * 任意オブジェクトをLightningBarrierにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseLightningBarrier = (
  origin: unknown,
): LightningBarrier | null => {
  const result = LightningBarrierSchema.safeParse(origin);
  return result.success ? result.data : null;
};
