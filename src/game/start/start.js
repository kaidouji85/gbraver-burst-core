// @flow

import type {GameState} from "../../state/game-state";
import {startGame} from "../../effect/start-game";
import {gameStartInputCommand} from "../../effect/input-command";
import {upcastGameState} from "../../state/game-state";
import type {GamePlayers} from "../../player/game-players";

/**
 * ゲームの初期状態を生成する
 *
 * @param players ゲーム参加プレイヤー
 * @return ゲーム初期状態
 */
export function start(players: GamePlayers): GameState[] {
  const done = startGame(players);
  const initialState = upcastGameState(done);
  return [
    initialState,
    gameStartInputCommand(initialState)
  ];
}