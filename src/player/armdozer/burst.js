// @flow

/** バースト */
export type Burst = RecoverBattery | BuffPower | LightningBarrier;

/** バッテリー回復 */
export type RecoverBattery = {
  type: 'RecoverBattery',
  /** バッテリー回復量 */
  recoverBattery: number,
};

/** 攻撃力バフ */
export type BuffPower = {
  type: 'BuffPower',
  /** バッテリー回復量 */
  recoverBattery: number,
  /** 攻撃力アップ */
  buffPower: number,
  /** バフ継続ターン数 */
  duration: number
};

/** 電撃バリア */
export type LightningBarrier = {
  type: 'LightningBarrier',
  /** バッテリー回復量 */
  recoverBattery: number,
  /** 電撃ダメージ */
  damage: number,
  /** バリア継続ターン数 */
  duration: number,
};