// @flow

import type {ReflectDamageEffect} from "../../effect/reflect/reflect";

/**
 * アームドーザに適用される効果
 * バフ、デバフなどのターン継続効果を想定している
 */
export type ArmdozerEffect = EmptyArmdozerEffect | CorrectPower | TryReflect | ContinuousActivePlayer;

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

/**
 * アクティブプレイヤー継続
 */
export type ContinuousActivePlayer = {
  type: 'ContinuousTurn',

  /**
   * 効果継続ターン
   * 本プロパティには必ずInfinityをセットすること
   */
  remainingTurn: typeof Infinity,
};
