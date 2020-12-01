// @flow

import type {PlayerState} from "../../../state/player-state";
import type {BatteryCommand} from "../../../command/battery";
import {normalHitDamage} from "../damage/damage";
import {damageDecrease} from "./damage-decrease";

/** クリティカルヒット */
export type CriticalHit = {
  name: 'CriticalHit',
  damage: number
};

/**
 * クリティカルヒットの戦闘結果を生成する
 *
 * @param attacker 攻撃側プレイヤー
 * @param attackerCommand 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderCommand 防御側バッテリー
 * @return クリティカルヒットの戦闘結果
 */
export function criticalHit(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): CriticalHit {
  const normalHit = normalHitDamage(attacker, attackerCommand, defender, defenderCommand);
  const decrease = damageDecrease(defender.armdozer.effects);
  const damage = normalHit * 2 - decrease;
  return {
    name: 'CriticalHit',
    damage: damage,
  };
}