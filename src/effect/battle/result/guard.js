// @flow

import type {PlayerState} from "../../../state/player-state";
import type {BatteryCommand} from "../../../command/battery";
import {normalHitDamage} from "../damage/damage";
import {damageDecrease} from "../../../state/armdozer-effect";

/** ガード */
export type Guard = {
  name: 'Guard',
  damage: number
};

/**
 * 防御の戦闘結果を生成する
 *
 * @param attacker 攻撃側プレイヤー
 * @param attackerCommand 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderCommand 防御側バッテリー
 * @return 防御の戦闘結果
 */
export function guard(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): Guard {
  const normalHit = normalHitDamage(attacker, attackerCommand, defender, defenderCommand);
  const decrease = damageDecrease(defender.armdozer.effects);
  const damage = normalHit / 2 - decrease;
  return {
    name: 'Guard',
    damage: damage
  };
}
