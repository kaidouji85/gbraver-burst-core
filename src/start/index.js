// @flow
import type {GameState} from '../game-state/index';
import {getFirstTurnPlayer} from './first-turn-payer';
import type {Player} from "../player/player";
import {PhaseNameList} from "../phase/phase-name";
import {createOpenPlayerState} from "../game-state/open-player-state";

/**
 * ゲームの初期状態を生成する
 *
 * @param player1 プレイヤー1
 * @param player2 プレイヤー2
 * @return ゲーム初期状態
 */
export function start(player1: Player, player2: Player): GameState {
  const openPlayerStateList = [player1, player2].map(v => createOpenPlayerState(v));
  const secretPlayerStateList = [player1, player2]
    .map(v => ({
      playerId: v.playerId,
      lastCommand: {type: 'EMPTY_COMMAND'}
    }));

  return {
    steps: [{
      openState: {
        players: openPlayerStateList,
        phase: PhaseNameList.COMMAND_PHASE,
        activePlayerId: getFirstTurnPlayer(openPlayerStateList[0], openPlayerStateList[1])
      },
      secretState: {
        players: secretPlayerStateList
      }
    }]
  };
}