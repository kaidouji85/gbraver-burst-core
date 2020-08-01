/// @flow

/**
 * パイロットID
 */
export type PilotId = string;

/**
 * パイロット
 */
export type Pilot = {
  /** ID */
  id: PilotId,

  /** パイロット名 */
  name: string,

  /** スキル */
  skill: PilotSkill,
};

/**
 * パイロットスキル
 */
export type PilotSkill = BatteryRecoverSkill;

/**
 * パイロットスキル バッテリー回復
 */
export type BatteryRecoverSkill = {
  type: 'BatteryRecoverSkill',
  recoverBattery: number
};