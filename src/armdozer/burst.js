// @flow

/** バースト */
export type Burst = RecoverBattery | BuffPower | Barrier;

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

/** バリア */
export type Barrier = {
  type: 'Barrier',
  /** バリアに触れた時のダメージ */
  damage: number,
  /** バリア継続ターン */
  duration: number,
};
