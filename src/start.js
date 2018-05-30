// @flow
import type {Player} from "./player/player";
import type {GameState} from "./game-state/game-state";
import {startGame} from "./effect/start-game/index";
import {inputCommand} from "./effect/input-command/index";

/**
 * ゲームの初期状態を生成する
 *
 * @param player1 プレイヤー1
 * @param player2 プレイヤー2
 * @return ゲーム初期状態
 */
export function start(player1: Player, player2: Player): GameState[] {
  const initialState = startGame(player1, player2);
  return [
    inputCommand(initialState)
  ];
}