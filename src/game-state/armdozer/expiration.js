// @flow

/** 有効期限つき効果 */
export type TimeLimitEffect = {
  /** 効果の有効期限フラグ、trueで効果の有効期限あり */
  hasTimeLimit: true,
  /** 効果が続く残りターン */
  remainingTurn: number
};

/** 永続効果 */
export type PerpetualEffect = {
  /** 効果の有効期限フラグ、falseで永続効果 */
  hasTimeLimit: false
};
