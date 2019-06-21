// @flow

import type {CorrectPower} from "../../src/game-state/armdozer/armdozer-effects";

/** 空の攻撃力補正 */
export const EMPTY_CORRECT_POWER: CorrectPower = {
  type: 'CorrectPower',
  power: 0,
  remainingTurn: 1,
};