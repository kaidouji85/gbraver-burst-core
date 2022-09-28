// @flow
import type {PlayerState} from "../../../state/player-state";
import {totalDamageDecrease} from "../../damage-decrease";
import {hasDamageHalved} from "../../damage-halved";
import {toMinDamage} from "../../to-min-damage";
import {normalHitDamage} from "../damage/damage";

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
  const reduction = hasDamageHalved(defender.armdozer.effects) ? 0.5 : 1;
  const damage = toMinDamage((normalHit - decrease) * 0.5 * reduction);
  return {name: 'Guard', damage: damage};
}
