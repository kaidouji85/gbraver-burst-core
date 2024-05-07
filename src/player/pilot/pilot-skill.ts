import { z } from "zod";

import {
  BatteryBoostSkill,
  BatteryBoostSkillSchema,
} from "./battery-boost-skill";
import {
  BatteryEnhancementSkill,
  BatteryEnhancementSkillSchema,
} from "./battery-enhancement-skill";
import { BuffPowerSkill, BuffPowerSkillSchema } from "./buff-power-skill";
import {
  DamageHalvedSkill,
  DamageHalvedSkillSchema,
} from "./damage-halved-skill";
import {
  RecoverBatterySkill,
  RecoverBatterySkillSchema,
} from "./recover-battery-skill";

/** パイロットスキル */
export type PilotSkill =
  | RecoverBatterySkill
  | BuffPowerSkill
  | BatteryEnhancementSkill
  | DamageHalvedSkill
  | BatteryBoostSkill;

/** PilotSkill zodスキーマ */
export const PilotSkillSchema = z.union([
  RecoverBatterySkillSchema,
  BuffPowerSkillSchema,
  BatteryEnhancementSkillSchema,
  DamageHalvedSkillSchema,
  BatteryBoostSkillSchema,
]);
