// @flow

import type {PlayerState} from "../../../state/player-state";
import {normalHitDamage} from "../damage/damage";
import {totalDamageDecrease} from "../../damage-decrease";

/** ガード */
export type Guard = {
  name: 'Guard',
  damage: number
};

/**
 * 防御の戦闘結果を生成する
 *
 * @param attacker 攻撃側プレイヤー
 * @param attackerBattery 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderBattery 防御側バッテリー
 * @return 防御の戦闘結果
 */
export function guard(attacker: PlayerState, attackerBattery: number, defender: PlayerState, defenderBattery: number): Guard {
  const normalHit = normalHitDamage(attacker, attackerBattery, defender, defenderBattery);
  const decrease = totalDamageDecrease(defender.armdozer.effects);
  const damage = normalHit / 2 - decrease;
  return {
    name: 'Guard',
    damage: damage
  };
}
