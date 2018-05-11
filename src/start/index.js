// @flow
import {getFirstTurnPlayer} from './first-turn-payer';
import type {Player} from "../player/player";
import {createOpenPlayerState} from "../game-state/player-state";
import type {EnableCommand} from "../effect/input-command/input-command";
import {getEnableCommand} from "../effect/input-command/index";
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

  return [{
    players: openPlayerStateList,
    activePlayerId: getFirstTurnPlayer(openPlayerStateList[0], openPlayerStateList[1]),
    effect: {
      name: 'InputCommand',
      players: enableCommand
    }
  }];
}