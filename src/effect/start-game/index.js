// @flow

import type {Player} from "../../player/player";
import type {GameState} from "../../game/state/game-state";
import {createOpenPlayerState} from "../../game/state/player-state";
import {getFirstTurnPlayer} from "./first-turn-payer";

/**
 * プレイヤー情報を受け取り、初期ゲームステートを生成する
 *
 * @param player1 プレイヤー1
 * @param player2 プレイヤー2
 * @return 初期ゲームステート
 */
export function startGame(player1: Player, player2: Player): GameState {
  const openPlayerStateList = [player1, player2].map(v => createOpenPlayerState(v));

  return {
    players: openPlayerStateList,
    activePlayerId: getFirstTurnPlayer(openPlayerStateList[0], openPlayerStateList[1]),
    effect: {
      name: 'StartGame'
    }
  };
}