// @flow

import type {CorrectPower, EmptyArmdozerEffect} from "../../src/game/state/armdozer-effect";

/** 空のアームドーザエフェクト */
export const EMPTY_ARMDOZER_EFFECT: EmptyArmdozerEffect = {
  type: 'Empty',
  remainingTurn: 1,
};

/** 空の攻撃力補正 */
export const EMPTY_CORRECT_POWER: CorrectPower = {
  type: 'CorrectPower',
  power: 0,
  remainingTurn: 1,
};
