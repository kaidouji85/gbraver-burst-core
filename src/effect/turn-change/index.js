// @flow

import type {GameState} from "../../state/game-state";
import {BATTERY_RECOVERY_VALUE, turnChangeRecoverBattery} from "./recover-battery";
import type {GameStateX, TurnChange} from "../..";

/**
 * ターンチェンジを実行する
 *
 * @param lastState 更新前のゲームステート
 * @return 実行結果、実行不可能な場合はnullを返す
 */
export function turnChange(lastState: GameState): ?GameStateX<TurnChange> {
  const nextActivePlayer = lastState.players.find(v => v.playerId !== lastState.activePlayerId);
  if (!nextActivePlayer) {
    return null;
  }

  const updatedBattery = turnChangeRecoverBattery(
    nextActivePlayer.armdozer.battery,
    nextActivePlayer.armdozer.maxBattery,
    BATTERY_RECOVERY_VALUE
  );
  const updatedPlayer = {
    ...nextActivePlayer,
    armdozer: {
      ...nextActivePlayer.armdozer,
      battery: updatedBattery,
    }
  };
  const updatedPlayerList = lastState.players
    .map(v => v.playerId === updatedPlayer.playerId ? updatedPlayer : v);

  return {
    ...lastState,
    activePlayerId: updatedPlayer.playerId,
    players: updatedPlayerList,
    effect: {
      name: 'TurnChange',
      recoverBattery: BATTERY_RECOVERY_VALUE
    }
  };
}