import { z } from "zod";

import { BatteryDrain, BatteryDrainSchema } from "./battery-drain";
import {
  BatteryLimitBreak,
  BatteryLimitBreakSchema,
} from "./battery-limit-break";
import { BuffPower, BuffPowerSchema } from "./buff-power";
import { ContinuousAttack, ContinuousAttackSchema } from "./continuous-attack";
import { ForceTurnEnd, ForceTurnEndSchema } from "./force-turn-end";
import { Ineffective, IneffectiveSchema } from "./ineffective";
import { LightningBarrier, LightningBarrierSchema } from "./lightning-barrier";
import { RecoverBattery, RecoverBatterySchema } from "./recover-battery";

/** バースト */
export type Burst =
  | RecoverBattery
  | BuffPower
  | LightningBarrier
  | ContinuousAttack
  | BatteryLimitBreak
  | BatteryDrain
  | ForceTurnEnd
  | Ineffective;

/** Burst zodスキーマ */
export const BurstSchema = z.union([
  RecoverBatterySchema,
  BuffPowerSchema,
  LightningBarrierSchema,
  ContinuousAttackSchema,
  BatteryLimitBreakSchema,
  BatteryDrainSchema,
  ForceTurnEndSchema,
  IneffectiveSchema,
]);
