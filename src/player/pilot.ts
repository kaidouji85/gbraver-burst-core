/** パイロットID */
export type PilotId = string;

/** パイロットスキル */
export type PilotSkill =
  | RecoverBatterySkill
  | BuffPowerSkill
  | BatteryEnchantmentSkill
  | DamageHalvedSkill
  | BatteryBoostSkill;

/** パイロットスキル バッテリー回復 */
export type RecoverBatterySkill = {
  type: "RecoverBatterySkill";
  recoverBattery: number;
};

/** パイロットスキル 攻撃バフ */
export type BuffPowerSkill = {
  type: "BuffPowerSkill";
  /** 攻撃力アップ */
  buffPower: number;
  /** バフ継続ターン数 */
  duration: number;
};

/** バッテリー増強スキル */
export type BatteryEnchantmentSkill = {
  type: "BatteryEnchantmentSkill";
  /** バッテリー増強値 */
  batteryEnchantment: number;
  /** 継続ターン数 */
  duration: number;
};

/** ダメージ半減スキル */
export type DamageHalvedSkill = {
  type: "DamageHalvedSkill";
  /** 継続ターン数 */
  duration: number;
};

/**
 * バッテリーブーストスキル
 * バッテリーを大幅回復できるが、次の自分ターン開始時のバッテリー回復がスキップされる
 */
export type BatteryBoostSkill = {
  type: "BatteryBoostSkill";
  /** バッテリー回復量 */
  recoverBattery: number;
};

/** パイロット */
export type Pilot = PilotX<PilotSkill>;

/**
 * パイロット
 * @template X パイロットスキル
 */
export type PilotX<X> = {
  /** ID */
  id: PilotId;
  /** パイロット名 */
  name: string;
  /** スキル */
  skill: X;
};
