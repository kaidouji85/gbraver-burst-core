/// @flow

/**
 * パイロットID
 */
export type PilotId = string;

/**
 * パイロットスキル
 */
export type PilotSkill = RecoverBatterySkill;

/**
 * パイロットスキル バッテリー回復
 */
export type RecoverBatterySkill = {
  type: 'RecoverBatterySkill',
  recoverBattery: number
};

/**
 * パイロット
 */
export type Pilot = PilotX<PilotSkill>;

/**
 * パイロット
 *
 * @type X パイロットスキル
 */
export type PilotX<X> = {
  /** ID */
  id: PilotId,

  /** パイロット名 */
  name: string,

  /** スキル */
  skill: X,
};