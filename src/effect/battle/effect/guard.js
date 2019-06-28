// @flow

import type {PlayerState} from "../../../game-state/player-state";
import type {BatteryCommand} from "../../../command/battery";
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
 * @param attackerCommand 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderCommand 防御側バッテリー
 * @return 防御の戦闘結果
 */
export function guard(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): Guard {
  return {
    name: 'Guard',
    damage: normalHitDamage(attacker, attackerCommand, defender, defenderCommand) / 2
  };
}
