import {z} from "zod";
import {BurstRecoverBattery, BurstRecoverBatterySchema} from "./burst-recover-battery";
import {RecoverBattery, RecoverBatterySchema} from "./recover-battery";
import {BuffPower, BuffPowerSchema} from "./buff-power";
import {LightningBarrier, LightningBarrierSchema} from "./lightning-barrier";
import {ContinuousAttack, ContinuousAttackSchema} from "./continuous-attack";

/** バッテリーリミットブレイク */
export type BatteryLimitBreak = BurstRecoverBattery &
  Readonly<{
    type: "BatteryLimitBreak";
    /** バースト後の最大バッテリー */
    maxBattery: number;
  }>;

/** BatteryLimitBreak zodスキーマ */
export const BatteryLimitBreakSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("BatteryLimitBreak"),
  maxBattery: z.number(),
});

/**
 * 任意オブジェクトをBatteryLimitBreakにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBatteryLimitBreak = (
  origin: unknown,
): BatteryLimitBreak | null => {
  const result = BatteryLimitBreakSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** バースト */
export type Burst =
  | RecoverBattery
  | BuffPower
  | LightningBarrier
  | ContinuousAttack
  | BatteryLimitBreak;

/** Burst zodスキーマ */
export const BurstSchema = z.union([
  RecoverBatterySchema,
  BuffPowerSchema,
  LightningBarrierSchema,
  ContinuousAttackSchema,
  BatteryLimitBreakSchema,
]);

/**
 * 任意オブジェクトをBurstにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBurst = (origin: unknown): Burst | null => {
  const result = BurstSchema.safeParse(origin);
  return result.success ? result.data : null;
};
