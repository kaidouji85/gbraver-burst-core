// @flow

import type {PlayerState} from "../../../state/player-state";
import type {BatteryCommand} from "../../../command/battery";
import {normalHitDamage} from "../damage/damage";
import {damageDecrease} from "./damage-decrease";

/** 攻撃ヒット */
export type NormalHit = {
  name: 'NormalHit',
  damage: number
};

/**
 * 攻撃ヒットの戦闘結果を生成する
 *
 * @param attacker 攻撃側プレイヤー
 * @param attackerCommand 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderCommand 防御側バッテリー
 * @return 攻撃ヒットの戦闘結果
 */
export function normalHit(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): NormalHit {
  const normalHit = normalHitDamage(attacker, attackerCommand, defender, defenderCommand);
  const decrease = damageDecrease(defender.armdozer.effects);
  const damage = normalHit - decrease;
  return {
    name: 'NormalHit',
    damage: damage
  };
}

