// @flow
import type {GameState} from '../game-state';
import {createArmdozerGameState} from '../../armdozer/armdozer-game-state';
import {getFirstTurnPlayer} from './first-turn-payer';
import type {Player} from "../../player/player";
import {PhaseNameList} from "../phase-name";

/**
 * ゲームの初期状態を生成する
 *
 * @param player1 プレイヤー1
 * @param player2 プレイヤー2
 * @return ゲーム初期状態
 */
export function start(player1: Player, player2: Player): GameState[] {
  const players = [player1, player2]
    .map(v => ({
      playerId: v.playerId,
      armDozer: createArmdozerGameState(v.armDozer)
    }));
  const firstState: GameState = {
    players,
    phase: PhaseNameList.COMMAND_PHASE,
    activePlayerId: getFirstTurnPlayer(players[0], players[1])
  };
  return [firstState];
}