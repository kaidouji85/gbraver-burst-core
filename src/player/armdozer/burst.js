// @flow

/** バースト */
export type Burst = RecoverBattery | BuffPower;

/** バッテリー回復 */
export type RecoverBattery = {
  type: 'RecoverBattery',
  /** バッテリー回復料 */
  recoverBattery: number,
};

/** 攻撃力バフ */
export type BuffPower = {
  type: 'BuffPower',
  /** バッテリー回復料 */
  recoverBattery: number,
  /** 攻撃力アップ */
  buffPower: number,
  /** バフ継続ターン数 */
  duration: number
};
