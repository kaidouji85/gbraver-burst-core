// @flow

import type {GameState} from "../../game/state/game-state";
import {isPlayerDeath} from "../../game/state/player-state";
import type {BatteryCommand} from "../../command/battery";
import {battleResult} from "./result/battle-result";
import {updateDefender} from "./players/update-defender";
import type {PlayerCommandX} from "../..";

/**
 * 戦闘を行う
 *
 * @param lastState 更新前の状態
 * @param attackerCommand 攻撃側バッテリーコマンド
 * @param defenderCommand 防御側バッテリーコマンド
 * @return 更新結果
 */
export function battle(lastState: GameState, attackerCommand: PlayerCommandX<BatteryCommand>, defenderCommand: PlayerCommandX<BatteryCommand>): GameState {
  const attacker = lastState.players.find(v => v.playerId === attackerCommand.playerId);
  const defender = lastState.players.find(v => v.playerId === defenderCommand.playerId);
  if (!attacker || !defender) {
    return lastState;
  }

  const result = battleResult(attacker, attackerCommand.command, defender, defenderCommand.command);
  const updatedDefender = updateDefender(result, defender);
  const updatedPlayers = lastState.players.map(v => v.playerId === updatedDefender.playerId ? updatedDefender : v);
  const effect = {
    name: 'Battle',
    attacker: attacker.playerId,
    isDeath: isPlayerDeath(updatedDefender),
    result: result
  };
  return {
    ...lastState,
    players: updatedPlayers,
    effect: effect
  }
}
