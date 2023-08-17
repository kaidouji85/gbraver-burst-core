import { Player } from "../../player/player";
import { GameStateX } from "../../state/game-state";
import { createPlayerState } from "../../state/player-state/create-player-state";
import { getFirstTurnPlayer } from "./first-turn-payer";
import { StartGame } from "./start-game";

/**
 * プレイヤー情報を受け取り、初期ゲームステートを生成する
 *
 * @param players ゲーム参加プレイヤー
 * @return 初期ゲームステート
 */
export function startGame(players: [Player, Player]): GameStateX<StartGame> {
  const openPlayerStateList = players.map((v) => createPlayerState(v));
  return {
    players: openPlayerStateList,
    activePlayerId: getFirstTurnPlayer(
      openPlayerStateList[0],
      openPlayerStateList[1],
    ),
    effect: {
      name: "StartGame",
    },
  };
}
