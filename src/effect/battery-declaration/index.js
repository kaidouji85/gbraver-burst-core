// @flow

import type {GameState} from "../../game/state/game-state";
import type {PlayerState} from "../../game/state/player-state";
import type {BatteryCommand} from "../../command/battery";
import {updatePlayer} from "./update-player";
import type {BatteryDeclaration, GameStateX, PlayerId} from "../..";

/**
 * 攻撃、防御のバッテリー宣言を実行する
 *
 * @param lastState 最新状態
 * @param attackerId 攻撃プレイヤーID
 * @param attackerBattery 攻撃バッテリー
 * @param defenderId 防御プレイヤーID
 * @param defenderBattery 防御バッテリー
 * @returns 更新結果、実行不可能な場合はnullを返す
 */
export function batteryDeclaration(lastState: GameState, attackerId: PlayerId, attackerBattery: BatteryCommand, defenderId: PlayerId, defenderBattery: BatteryCommand): ?GameStateX<BatteryDeclaration> {
  const attacker: ?PlayerState = lastState.players.find(v => v.playerId === attackerId);
  const defender: ?PlayerState = lastState.players.find(v => v.playerId === defenderId);
  if (!attacker || !defender) {
    return null;
  }

  const updatedAttacker = updatePlayer(attacker, attackerBattery);
  const updatedDefender = updatePlayer(defender, defenderBattery);
  const updatedPlayers = lastState.players.map(v => {
    if (v.playerId === updatedAttacker.playerId) {
      return updatedAttacker;
    } else if (v.playerId === updatedDefender.playerId) {
      return updatedDefender;
    } else {
      return v;
    }
  });
  const effect = {
    name: 'BatteryDeclaration',
    attacker: attacker.playerId,
    attackerBattery: attackerBattery.battery,
    defenderBattery: defenderBattery.battery,
  };
  return {
    ...lastState,
    players: updatedPlayers,
    effect: effect
  }
}