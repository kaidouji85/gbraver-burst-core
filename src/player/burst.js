// @flow

/** バースト */
export type Burst =
  | RecoverBattery
  | BuffPower
  | LightningBarrier
  | ContinuousAttack;

/**
 * 全バースト共通で利用するバッテリー回復プロパティ
 */
export type BurstRecoverBattery = {
  /** バッテリー回復量 */
  recoverBattery: number,
};

/** バッテリー回復 */
export type RecoverBattery = BurstRecoverBattery & {
  type: "RecoverBattery",
};

/** 攻撃力バフ */
export type BuffPower = BurstRecoverBattery & {
  type: "BuffPower",
  /** 攻撃力アップ */
  buffPower: number,
  /** バフ継続ターン数 */
  duration: number,
};

/** 電撃バリア */
export type LightningBarrier = BurstRecoverBattery & {
  type: "LightningBarrier",
  /** 電撃ダメージ */
  damage: number,
  /** バリア継続ターン数 */
  duration: number,
};

/**
 * 連続攻撃
 */
export type ContinuousAttack = BurstRecoverBattery & {
  type: "ContinuousAttack",
};
