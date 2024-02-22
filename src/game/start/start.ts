import { gameStartInputCommand } from "../../effect/input-command";
import { startGame } from "../../effect/start-game";
import type { Player } from "../../player/player";
import type { GameState } from "../../state/game-state";
import { startGameFlow } from "../game-flow";

/**
 * ゲームの初期状態を生成する
 *
 * @param players ゲーム参加プレイヤー
 * @return ゲーム初期状態
 */
export function start(players: [Player, Player]): GameState[] {
  return startGameFlow([
    () => [startGame(players)],
    (state) => [gameStartInputCommand(state)],
  ]);
}
