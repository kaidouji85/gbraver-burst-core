// @flow
import type {Player} from "../../player/player";
import type {GameState} from "../../state/game-state";
import {startGame} from "../../effect/start-game";
import {gameStartInputCommand} from "../../effect/input-command";
import {upcastGameState} from "../../state/game-state";

/**
 * ゲームの初期状態を生成する
 *
 * @param player1 プレイヤー1
 * @param player2 プレイヤー2
 * @return ゲーム初期状態
 */
export function start(player1: Player, player2: Player): GameState[] {
  const done = startGame(player1, player2);
  const initialState = upcastGameState(done);
  return [
    initialState,
    gameStartInputCommand(initialState)
  ];
}