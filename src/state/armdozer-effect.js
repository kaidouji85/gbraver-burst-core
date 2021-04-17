// @flow

/**
 * アームドーザに適用される効果
 * バフ、デバフなどのターン継続効果を想定している
 */
export type ArmdozerEffect = EmptyArmdozerEffect
  | CorrectPower
  | TryReflect
  | ContinuousActivePlayer
  | DamageDecrease
  | BatteryCorrection;

/**
 * 何もしない効果
 * 全ての効果か本タイプのプロパティを持つこと
 */
export type EmptyArmdozerEffect = {
  /** 効果判別用のプロパティ */
  type: 'Empty',

  /**
   * 効果継続ターン
   * 本プロパティにInfinityが指定された場合、永続効果と見なす
   */
  remainingTurn: number
};

/** 攻撃力補正 */
export type CorrectPower = {
  type: 'CorrectPower',

  /** 攻撃力補正値 */
  power: number,

  /** 効果継続ターン */
  remainingTurn: number
};

/** ダメージエフェクトの種類 */
export type ReflectDamageEffect = 'Lightning';

/** ダメージ反射 */
export type TryReflect = {
  type: 'TryReflect',

  /** 反射が成功した場合のダメージ */
  damage: number,

  /** 反射のダメージエフェクト */
  effect: ReflectDamageEffect,

  /** 効果継続ターン */
  remainingTurn: number
};

/** ダメージ減少 */
export type DamageDecrease= {
  type: 'DamageDecrease',

  /** 減少されるダメージ値 */
  decrease: number;

  /** 効果継続ターン */
  remainingTurn: number
};

/**
 * アクティブプレイヤー継続
 */
export type ContinuousActivePlayer = {
  type: 'ContinuousActivePlayer',

  /**
   * 効果継続ターン
   * 本プロパティには必ずInfinityをセットすること
   */
  remainingTurn: typeof Infinity,
};

/**
 * バッテリー補正
 */
export type BatteryCorrection = {
  type: 'BatteryCorrection',

  /** バッテリー補正値 */
  batteryCorrection: number,

  /** 効果継続ターン */
  remainingTurn: number
};

// TODO ダメージ減少は攻撃側も参照することがあるので、引数の名前を変更する
/**
 * 防御側のアームドーザ効果からダメージ減少値を計算する
 *
 * @param defenderEffects 防御側のアームドーザ効果
 * @return ダメージ減少値
 */
export function totalDamageDecrease(defenderEffects: ArmdozerEffect[]): number {
  return defenderEffects
    .map(v => (v.type === 'DamageDecrease') ? v.decrease : 0)
    .reduce((a, b) => a + b, 0);
}
