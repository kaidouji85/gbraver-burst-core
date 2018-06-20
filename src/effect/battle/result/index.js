// @flow
import type {PlayerState} from "../../../game-state/player-state";
import type {BatteryCommand} from "../../../command/battery";
import type {BattleResult} from "../battle";
import {normalHit} from "./normal-hit";
import {guard} from "./guard";
import {criticalHit} from "./critical-hit";

/**
 * 戦闘結果を生成して返す
 *
 * @param attacker 攻撃側プレイヤー
 * @param attackerCommand 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderCommand 防御側バッテリー
 * @return 戦闘結果
 */
export function battleResult(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): BattleResult {
  if (attackerCommand.battery === defenderCommand.battery) {
    return guard(attacker);
  }

  if ((defenderCommand.battery < attackerCommand.battery) && defenderCommand.battery === 0) {
    return criticalHit(attacker, attackerCommand, defender, defenderCommand);
  }

  if (defenderCommand.battery < attackerCommand.battery) {
    return normalHit(attacker, attackerCommand, defender, defenderCommand);
  }

  return {
    name: 'Miss'
  };
}

