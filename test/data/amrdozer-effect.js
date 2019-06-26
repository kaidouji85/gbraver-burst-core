// @flow

import type {CorrectPower} from "../../src/game-state/armdozer/armdozer-effect";

/** 空の攻撃力補正 */
export const EMPTY_CORRECT_POWER: CorrectPower = {
  type: 'CorrectPower',
  power: 0,
  hasTimeLimit: true,
  remainingTurn: 1,
};
