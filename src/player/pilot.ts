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

/** パイロットスキル 攻撃バフ */
export type BuffPowerSkill = Readonly<{
  type: "BuffPowerSkill";
  /** 攻撃力アップ */
  buffPower: number;
  /** バフ継続ターン数 */
  duration: number;
}>;

/** バッテリー増強スキル */
export type BatteryEnchantmentSkill = Readonly<{
  type: "BatteryEnchantmentSkill";
  /** バッテリー増強値 */
  batteryEnchantment: number;
  /** 継続ターン数 */
  duration: number;
}>;

/** ダメージ半減スキル */
export type DamageHalvedSkill = Readonly<{
  type: "DamageHalvedSkill";
  /** 継続ターン数 */
  duration: number;
}>;

/**
 * バッテリーブーストスキル
 * バッテリーを大幅回復できるが、次の自分ターン開始時のバッテリー回復がスキップされる
 */
export type BatteryBoostSkill = Readonly<{
  type: "BatteryBoostSkill";
  /** バッテリー回復量 */
  recoverBattery: number;
}>;

/** パイロットスキル */
export type PilotSkill =
  | RecoverBatterySkill
  | BuffPowerSkill
  | BatteryEnchantmentSkill
  | DamageHalvedSkill
  | BatteryBoostSkill;

/** パイロット */
export type Pilot = PilotX<PilotSkill>;

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
