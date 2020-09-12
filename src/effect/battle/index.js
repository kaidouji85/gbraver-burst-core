// @flow

import type {GameState} from "../../game/state/game-state";
import {isPlayerDeath} from "../../game/state/player-state";
import type {BatteryCommand} from "../../command/battery";
import {battleResult} from "./result/battle-result";
import {updateDefender} from "./players/update-defender";
import type {Battle, GameStateX, PlayerCommandX} from "../..";

/**
 * 戦闘を行う
 *
 * @param lastState 更新前の状態
 * @param attackerCommand 攻撃側バッテリーコマンド
 * @param defenderCommand 防御側バッテリーコマンド
 * @return 戦闘後の更新ステート、戦闘できない場合はnullを返す
 */
export function battle(lastState: GameState, attackerCommand: PlayerCommandX<BatteryCommand>, defenderCommand: PlayerCommandX<BatteryCommand>): ?GameStateX<Battle> {
  const attacker = lastState.players.find(v => v.playerId === attackerCommand.playerId);
  const defender = lastState.players.find(v => v.playerId === defenderCommand.playerId);
  if (!attacker || !defender) {
    return null;
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
