// @flow
import type {GameState} from "../../state/game-state";
import {startGame} from "../../effect/start-game";
import {gameStartInputCommand} from "../../effect/input-command";
import {upcastGameState} from "../../state/game-state";
import type {Player} from "../../player/player";
import {startGameStateFlow} from "../game-state-flow";

/**
 * ゲームの初期状態を生成する
 *
 * @param players ゲーム参加プレイヤー
 * @return ゲーム初期状態
 */
export function start(players: [Player, Player]): GameState[] {
  return startGameStateFlow([upcastGameState(startGame(players))])
    .update(state => [upcastGameState(gameStartInputCommand(state))])
    .toGameStateHistory();
}