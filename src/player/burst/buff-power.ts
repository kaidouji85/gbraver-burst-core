import {BurstRecoverBattery, BurstRecoverBatterySchema} from "./burst-recover-battery";
import {z} from "zod";

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

/**
 * 任意オブジェクトをBuffPowerにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBuffPower = (origin: unknown): BuffPower | null => {
  const result = BuffPowerSchema.safeParse(origin);
  return result.success ? result.data : null;
};