// @flow

import type {PlayerState} from "../../../game-state/player-state";
import type {BatteryCommand} from "../../../command/battery";
import type {CriticalHit} from "../battle";
import {normalHitDamage} from "./damage";

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
  return {
    name: 'CriticalHit',
    damage: normalHitDamage(attacker, attackerCommand, defender, defenderCommand) * 2
  };
}