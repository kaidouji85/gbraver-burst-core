// @flow

/** アームドーザID */
export type ArmDozerId = string;

/** アームドーザ基本ステータス */
export type ArmdozerStatus = {
  /** アームドーザID */
  id: ArmDozerId;
  /** 名前 */
  name: string;
  /** 最大HP */
  maxHp: number;
  /** 最大バッテリー */
  maxBattery: number;
  /** 攻撃 */
  power: number;
  /** スピード */
  speed: number;
};
