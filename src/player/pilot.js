/// @flow

/**
 * パイロットID
 */
export type PilotId = string;

/**
 * パイロットスキル
 */
export type PilotSkill = RecoverBatterySkill
  | BuffPowerSkill
  | DamageDecreaseSkill
  | BatteryEnchantmentSkill;

/**
 * パイロットスキル バッテリー回復
 */
export type RecoverBatterySkill = {
  type: 'RecoverBatterySkill',
  recoverBattery: number
};

/**
 * パイロットスキル 攻撃バフ
 */
export type BuffPowerSkill = {
  type: 'BuffPowerSkill',
  /** 攻撃力アップ */
  buffPower: number,
  /** バフ継続ターン数 */
  duration: number
};

/**
 * ダメージ減少スキル
 */
export type DamageDecreaseSkill = {
  type: 'DamageDecreaseSkill',
  /** ダメージ減少値 */
  decrease: number,
  /** 継続ターン数 */
  duration: number
};

/**
 * バッテリー増強スキル
 */
export type BatteryEnchantmentSkill = {
  type: 'BatteryEnchantmentSkill',
  /** バッテリー増強値 */
  batteryEnchantment: number,
};

/**
 * パイロット
 */
export type Pilot = PilotX<PilotSkill>;

/**
 * パイロット
 *
 * @template X パイロットスキル
 */
export type PilotX<X> = {
  /** ID */
  id: PilotId,

  /** パイロット名 */
  name: string,

  /** スキル */
  skill: X,
};