// @flow

import {createOpenPlayerState} from "../../state/player-state";
import {getFirstTurnPlayer} from "./first-turn-payer";
import type {GameStateX} from "../../state/game-state";
import type {StartGame} from "./start-game";
import type {Player} from "../../player/player";

/**
 * プレイヤー情報を受け取り、初期ゲームステートを生成する
 *
 * @param players ゲーム参加プレイヤー
 * @return 初期ゲームステート
 */
export function startGame(players: [Player, Player]): GameStateX<StartGame> {
  const openPlayerStateList = players.map(v => createOpenPlayerState(v));

  return {
    players: openPlayerStateList,
    activePlayerId: getFirstTurnPlayer(openPlayerStateList[0], openPlayerStateList[1]),
    effect: {
      name: 'StartGame'
    }
  };
}