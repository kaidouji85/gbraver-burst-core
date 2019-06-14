// @flow

/** バースト */
export type Burst = RecoverBattery | PlusPower;

/** バッテリー回復 */
export type RecoverBattery = {
  type: 'RecoverBattery',
  /** バッテリー回復料 */
  recoverBattery: number,
};

/** 攻撃力バフ */
export type PlusPower = {
  type: 'PlusPower',
  /** バッテリー回復料 */
  recoverBattery: number,
  /** 攻撃力アップ */
  plusPower: number,
  /** バフ継続ターン数 */
  duration: number
};