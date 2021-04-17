// @flow

import type {PlayerState} from "../../../state/player-state";
import {normalHitDamage} from "../damage/damage";
import {totalDamageDecrease} from "../../../state/armdozer-effect";

/** クリティカルヒット */
export type CriticalHit = {
  name: 'CriticalHit',
  damage: number
};

/**
 * クリティカルヒットの戦闘結果を生成する
 *
 * @param attacker 攻撃側プレイヤー
 * @param attackerBattery 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderBattery 防御側バッテリー
 * @return クリティカルヒットの戦闘結果
 */
export function criticalHit(attacker: PlayerState, attackerBattery: number, defender: PlayerState, defenderBattery: number): CriticalHit {
  const normalHit = normalHitDamage(attacker, attackerBattery, defender, defenderBattery);
  const decrease = totalDamageDecrease(defender.armdozer.effects);
  const damage = normalHit * 2 - decrease;
  return {
    name: 'CriticalHit',
    damage: damage,
  };
}