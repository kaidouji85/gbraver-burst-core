import { z } from "zod";

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

/** パイロットスキル バッテリー回復 */
export type RecoverBatterySkill = Readonly<{
  type: "RecoverBatterySkill";
  /** バッテリー回復量 */
  recoverBattery: number;
}>;

/** RecoverBatterySkill zodスキーマ */
export const RecoverBatterySkillSchema = z.object({
  type: z.literal("RecoverBatterySkill"),
  recoverBattery: z.number(),
});

/**
 * 任意オブジェクトをRecoverBatterySkillにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseRecoverBatterySkill = (origin: unknown): RecoverBatterySkill | null => {
  const result = RecoverBatterySkillSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** パイロットスキル 攻撃バフ */
export type BuffPowerSkill = Readonly<{
  type: "BuffPowerSkill";
  /** 攻撃力アップ */
  buffPower: number;
  /** バフ継続ターン数 */
  duration: number;
}>;

/** BuffPowerSkill zodスキーマ */
export const BuffPowerSkillSchema = z.object({
  type: z.literal("BuffPowerSkill"),
  buffPower: z.number(),
  duration: z.number(),
});

/**
 * 任意オブジェクトをBuffPowerSkillにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBuffPowerSkill = (origin: unknown): BuffPowerSkill | null => {
  const result = BuffPowerSkillSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** バッテリー増強スキル */
export type BatteryEnchantmentSkill = Readonly<{
  type: "BatteryEnchantmentSkill";
  /** バッテリー増強値 */
  batteryEnchantment: number;
  /** 継続ターン数 */
  duration: number;
}>;

/** BatteryEnchantmentSkill zodスキーマ */
export const BatteryEnchantmentSkillSchema = z.object({
  type: z.literal("BatteryEnchantmentSkill"),
  batteryEnchantment: z.number(),
  duration: z.number(),
});

/**
 * 任意オブジェクトをBatteryEnchantmentSkillにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBatteryEnchantmentSkill = (origin: unknown): BatteryEnchantmentSkill | null => {
  const result = BatteryEnchantmentSkillSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** ダメージ半減スキル */
export type DamageHalvedSkill = Readonly<{
  type: "DamageHalvedSkill";
  /** 継続ターン数 */
  duration: number;
}>;

/** DamageHalvedSkill zodスキーマ */
export const DamageHalvedSkillSchema = z.object({
  type: z.literal("DamageHalvedSkill"),
  duration: z.number(),
});

/**
 * 任意オブジェクトをDamageHalvedSkillにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseDamageHalvedSkill = (origin: unknown): DamageHalvedSkill | null => {
  const result = DamageHalvedSkillSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/**
 * バッテリーブーストスキル
 * バッテリーを大幅回復できるが、次の自分ターン開始時のバッテリー回復がスキップされる
 */
export type BatteryBoostSkill = Readonly<{
  type: "BatteryBoostSkill";
  /** バッテリー回復量 */
  recoverBattery: number;
}>;

/** BatteryBoostSkill zodスキーマ */
export const BatteryBoostSkillSchema = z.object({
  type: z.literal("BatteryBoostSkill"),
  recoverBattery: z.number(),
});

/**
 * 任意オブジェクトをBatteryBoostSkillにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBatteryBoostSkill = (origin: unknown): BatteryBoostSkill | null => {
  const result = BatteryBoostSkillSchema.safeParse(origin);
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