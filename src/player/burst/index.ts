import { z } from "zod";

import {
  BatteryLimitBreak,
  BatteryLimitBreakSchema,
} from "./battery-limit-break";
import { BuffPower, BuffPowerSchema } from "./buff-power";
import { ContinuousAttack, ContinuousAttackSchema } from "./continuous-attack";
import { LightningBarrier, LightningBarrierSchema } from "./lightning-barrier";
import { RecoverBattery, RecoverBatterySchema } from "./recover-battery";

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
