import { z } from "zod";

import { BatteryDecrease, BatteryDecreaseSchema } from "./battery-decrease";
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
  | BatteryLimitBreak
  | BatteryDecrease;

/** Burst zodスキーマ */
export const BurstSchema = z.union([
  RecoverBatterySchema,
  BuffPowerSchema,
  LightningBarrierSchema,
  ContinuousAttackSchema,
  BatteryLimitBreakSchema,
  BatteryDecreaseSchema,
]);
