// @flow

/** アームドーザ効果 */
export type ArmdozerEffect = EmptyArmdozerEffect | CorrectPower;

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

/** 当身技の見た目 */
export type BodyStrikingAppearance = 'Lightning';

/** 当身技 */
export type BodyStriking = {
  type: 'BodyStriking',

  /** 当身が成功した場合のダメージ */
  damage: number,

  /** 当身が成功した場合の見た目 */
  appearance: BodyStrikingAppearance,

  /** 効果継続ターン */
  remainingTurn: number
};
