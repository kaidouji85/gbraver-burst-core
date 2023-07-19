import type { GameState } from "../../state/game-state";
import { isPlayerDeath } from "../../state/player-state";
import type { GameEndJudging } from "./game-end-judging";

/**
 * ゲーム終了判定を行う
 * @param lastState 最新の状態
 * @return 判定結果
 */
export function gameEndJudging(lastState: GameState): GameEndJudging {
  const deathPlayer = lastState.players.filter((v) => isPlayerDeath(v));
  if (deathPlayer.length === 2) {
    return {
      type: "EvenMatch",
    };
  }

  const winner = lastState.players.find((v) => !isPlayerDeath(v));
  if (winner && deathPlayer.length === 1) {
    return {
      type: "GameOver",
      winner: winner.playerId,
    };
  }

  return {
    type: "GameContinue",
  };
}
