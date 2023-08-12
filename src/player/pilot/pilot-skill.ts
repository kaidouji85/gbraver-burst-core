import { z } from "zod";

import {
  BatteryBoostSkill,
  BatteryBoostSkillSchema,
} from "./battery-boost-skill";
import {
  BatteryEnchantmentSkill,
  BatteryEnchantmentSkillSchema,
} from "./battery-enchantment-skill";
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
  | BatteryEnchantmentSkill
  | DamageHalvedSkill
  | BatteryBoostSkill;

/** PilotSkill zodスキーマ */
export const PilotSkillSchema = z.union([
  RecoverBatterySkillSchema,
  BuffPowerSkillSchema,
  BatteryEnchantmentSkillSchema,
  DamageHalvedSkillSchema,
  BatteryBoostSkillSchema,
]);

/**
 * 任意オブジェクトをPilotSkillにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parsePilotSkill = (origin: unknown): PilotSkill | null => {
  const result = PilotSkillSchema.safeParse(origin);
  return result.success ? result.data : null;
};
