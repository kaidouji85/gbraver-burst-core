import {z} from "zod";
import {RecoverBatterySkill, RecoverBatterySkillSchema} from "./recover-battery-skill";
import {BuffPowerSkill, BuffPowerSkillSchema} from "./buff-power-skill";
import {BatteryEnchantmentSkill, BatteryEnchantmentSkillSchema} from "./battery-enchantment-skill";
import {DamageHalvedSkill, DamageHalvedSkillSchema} from "./damage-halved-skill";
import {BatteryBoostSkill, BatteryBoostSkillSchema} from "./battery-boost-skill";

/** パイロットID */
export type PilotId = string;

/** PilotId zodスキーマ */
export const PilotIdSchema = z.string();

/**
 * 任意オブジェクトをPilotIdにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parsePilotId = (origin: unknown): PilotId | null => {
  const result = PilotIdSchema.safeParse(origin);
  return result.success ? result.data : null;
};

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

/**
 * パイロット
 * @template X パイロットスキル
 */
export type PilotX<X> = Readonly<{
  /** ID */
  id: PilotId;
  /** パイロット名 */
  name: string;
  /** スキル */
  skill: X;
}>;

/** パイロット */
export type Pilot = PilotX<PilotSkill>;

/** Pilot zodスキーマ */
export const PilotSchema = z.object({
  id: PilotIdSchema,
  name: z.string(),
  skill: PilotSkillSchema,
});

/**
 * 任意オブジェクトをPilotにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parsePilot = (origin: unknown): Pilot | null => {
  const result = PilotSchema.safeParse(origin);
  return result.success ? result.data : null;
};
