// @flow

import type {CorrectPower, DamageDecrease, EmptyArmdozerEffect} from "../state/armdozer-effect";

/** 空のアームドーザエフェクト */
export const EMPTY_ARMDOZER_EFFECT: EmptyArmdozerEffect = {
  type: 'Empty',
  period: {
    type: 'TurnLimit',
    remainingTurn: 1,
  }
};

/** 空の攻撃力補正 */
export const EMPTY_CORRECT_POWER: CorrectPower = {
  type: 'CorrectPower',
  power: 0,
  period: {
    type: 'TurnLimit',
    remainingTurn: 1,
  }
};

/** 空ののダメージ減少 */
export const EMPTY_DAMAGE_DECREASE: DamageDecrease = {
  type: 'DamageDecrease',
  decrease: 0,
  period: {
    type: 'TurnLimit',
    remainingTurn: 1
  }
};