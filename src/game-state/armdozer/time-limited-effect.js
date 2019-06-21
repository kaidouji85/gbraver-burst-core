// @flow

/** 時限付き効果 */
export type TimeLimitedEffect = {
  /** 効果が続く残りターン */
  remainingTurn: number
};

/**
 * 時限付き効果か否かを判定する
 *
 * @param effect 判定対象
 * @return 判定結果、trueで時限付き効果である
 */
export function isTimeLimitedEffect(effect: any): boolean {
  if (!effect) {
    return false;
  }

  return (typeof effect.remainingTurn === 'number') && (isFinite(effect.remainingTurn));
}
