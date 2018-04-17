// @flow
import {getFirstTurnPlayer} from './first-turn-payer';
import type {Player} from "../player/player";
import {PhaseNameList} from "../phase/phase-name";
import {createOpenPlayerState} from "../game-state/open-player-state";
import type {EnableCommand} from "../effect/input-command/input-command";
import {getEnableCommand} from "../effect/input-command/do-input-command";
import type {GameState} from "../game-state/game-state";

/**
 * ゲームの初期状態を生成する
 *
 * @param player1 プレイヤー1
 * @param player2 プレイヤー2
 * @return ゲーム初期状態
 */
export function start(player1: Player, player2: Player): GameState[] {
  const openPlayerStateList = [player1, player2].map(v => createOpenPlayerState(v));
  const enableCommand: EnableCommand[] = openPlayerStateList.map(v => ({
    playerId: v.playerId,
    command: getEnableCommand(v)
  }));
  const secretPlayerStateList = [player1, player2]
    .map(v => ({
      playerId: v.playerId,
      lastCommand: {type: 'EMPTY_COMMAND'}
    }));

  return [{
      openState: {
        players: openPlayerStateList,
        phase: PhaseNameList.COMMAND_PHASE,
        activePlayerId: getFirstTurnPlayer(openPlayerStateList[0], openPlayerStateList[1]),
        effect: {
          name: 'InputCommand',
          players: enableCommand
        }
      },
      secretState: {
        players: secretPlayerStateList
      }
    }];
}