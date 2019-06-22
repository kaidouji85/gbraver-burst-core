// @flow

import type {TimeLimitedEffect} from "./time-limited-effect";

/** アームドーザ効果 */
export type ArmdozerEffect = CorrectPower;

/** 攻撃力補正 */
export type CorrectPower = TimeLimitedEffect & {
  type: 'CorrectPower',
  /** 攻撃力補正値 */
  power: number,
};
