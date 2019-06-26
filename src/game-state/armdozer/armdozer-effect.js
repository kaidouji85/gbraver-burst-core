// @flow

import type {TimeLimitEffect} from "./expiration";

/** アームドーザ効果 */
export type ArmdozerEffect = CorrectPower;

/** 攻撃力補正 */
export type CorrectPower = TimeLimitEffect & {
  type: 'CorrectPower',
  /** 攻撃力補正値 */
  power: number,
};
