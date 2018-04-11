// @flow

/** アームドーザID */
export type ArmDozerId = string;

/** アームドーザ基本情報 */
export type Armdozer = {
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
