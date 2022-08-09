// @flow

import type {GameState, GameStateX} from "../../state/game-state";
import type {TurnChange} from "../turn-change/turn-change";
import {hasContinuousActive} from "./has-continuous-active";
import {removeContinuousActive} from "./remove-continuous-active";

/**
 * アクティブプレイヤー継続を実行できるか否かを判定する
 *
 * @param state ゲーム ステート
 * @return 判定結果、trueで実行できる
 */
export function canContinuousActive(state: GameState): boolean {
  const activePlayer = state.players.find(v => v.playerId === state.activePlayerId);
  if (!activePlayer) {
    return false;
  }

  return hasContinuousActive(activePlayer.armdozer.effects);
}


/**
 * アクティブプレイヤー継続を実行する
 *
 * @param state 更新前のゲーム ステート
 * @return 更新結果、実行不可能な場合はnullを返す
 */
export function continuousActive(state: GameState): GameStateX<TurnChange> {
  const activePlayer = state.players.find(v => v.playerId === state.activePlayerId);
  if (!activePlayer) {
    throw new Error('not found active player');
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