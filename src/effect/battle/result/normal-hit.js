// @flow

import type {PlayerState} from "../../../game-state/player-state";
import type {BatteryCommand} from "../../../command/battery";
import type {NormalHit} from "../battle";
import {normalHitDamage} from "../damage";

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
  return {
    name: 'NormalHit',
    damage: normalHitDamage(attacker, attackerCommand, defender, defenderCommand)
  };
}

