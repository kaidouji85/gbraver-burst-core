// @flow

import type {PlayerState} from "../../../state/player-state";
import {normalHitDamage} from "../damage/damage";
import {totalDamageDecrease} from "../../damage-decrease";

/** 攻撃ヒット */
export type NormalHit = {
  name: 'NormalHit',
  damage: number
};

/**
 * 攻撃ヒットの戦闘結果を生成する
 *
 * @param attacker 攻撃側プレイヤー
 * @param attackerBattery 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderBattery 防御側バッテリー
 * @return 攻撃ヒットの戦闘結果
 */
export function normalHit(attacker: PlayerState, attackerBattery: number, defender: PlayerState, defenderBattery: number): NormalHit {
  const normalHit = normalHitDamage(attacker, attackerBattery, defender, defenderBattery);
  const decrease = totalDamageDecrease(defender.armdozer.effects);
  const damage = Math.max(normalHit - decrease, 0);
  return {
    name: 'NormalHit',
    damage: damage
  };
}

