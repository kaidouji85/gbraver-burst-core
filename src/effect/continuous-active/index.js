// @flow

import type {GameState, GameStateX, TurnChange} from "../..";
import {removeContinuousActive} from "./continuous-active";

/**
 * アクティブプレイヤー継続を実行する
 *
 * @param state 更新前のゲーム ステート
 * @return 更新結果、実行不可能な場合はnullを返す
 */
export function continuousActive(state: GameState): ?GameStateX<TurnChange> {
  const activePlayer = state.players.find(v => v.playerId === state.activePlayerId);
  if (!activePlayer) {
    return null;
  }

  const updatedActivePlayer = {
    ...activePlayer,
    armdozer: {
      ...activePlayer.armdozer,
      effects: removeContinuousActive(activePlayer.armdozer.effects)
    }
  };
  const updatedPlayers = state.players
    .map(v => v.playerId === activePlayer.playerId ? updatedActivePlayer : v);
  const effect = {
    name: 'TurnChange',
    recoverBattery: 0
  };
  return {
    ...state,
    players: updatedPlayers,
    effect: effect
  };
}