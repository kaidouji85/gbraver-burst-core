// @flow

import type {GameState} from "../../game/state/game-state";
import {isPlayerDeath} from "../../game/state/player-state";
import type {BatteryCommand} from "../../command/battery";
import {battleResult} from "./result/battle-result";
import {updateDefender} from "./players/update-defender";
import type {Battle, GameStateX, PlayerCommandX, PlayerId} from "../..";

/**
 * 戦闘を行う
 *
 * @param lastState 更新前の状態
 * @param attackerId 攻撃側プレイヤーID
 * @param attackerBattery 攻撃側バッテリーコマンド
 * @param defenderId 防御側プレイヤーID
 * @param defenderBattery 防御側バッテリーコマンド
 * @return 戦闘後の更新ステート、戦闘できない場合はnullを返す
 */
export function battle(lastState: GameState, attackerId: PlayerId, attackerBattery: BatteryCommand, defenderId: PlayerId, defenderBattery: BatteryCommand): ?GameStateX<Battle> {
  const attacker = lastState.players.find(v => v.playerId === attackerId);
  const defender = lastState.players.find(v => v.playerId === defenderId);
  if (!attacker || !defender) {
    return null;
  }

  const result = battleResult(attacker, attackerBattery, defender, defenderBattery);
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
