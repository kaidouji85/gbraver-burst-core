// @flow

import type {PlayerState} from "../../../state/player-state";
import {totalDamageDecrease} from "../../damage-decrease";
import {toMinDamage} from "../../to-min-damage";
import {normalHitDamage} from "../damage/damage";

/** クリティカルヒット */
export type CriticalHit = {
  name: 'CriticalHit',
  damage: number
};

/**
 * クリティカルヒットの戦闘結果を生成する
 *
 * @return クリティカルヒットの戦闘結果
 */
export function criticalHit(): CriticalHit {
  return {name: 'CriticalHit', damage: 9999};
}