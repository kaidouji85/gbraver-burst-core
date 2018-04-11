// @flow
import type {BattleState} from '../game-state';
import {createArmDozerBattleStatus} from '../../armdozer/armdozer-battle-status';
import {getFirstTurnPlayer} from './first-turn-payer';
import type {ArmdozerStatus} from "../../armdozer/armdozer-status";
import type {PlayerId} from "../../player/player-state";

/** プレイヤー情報 */
export type PlayerInfo = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** アームドーザデータ */
  armDozer: ArmdozerStatus;
};

/**
 * ゲームの初期状態を生成する
 *
 * @param player1
 * @param player2
 */
export function start(player1: PlayerInfo, player2: PlayerInfo): BattleState {
  const players = [player1, player2]
    .map(p => {
      const armDozer = createArmDozerBattleStatus(p.armDozer);
      return {playerId: p.playerId, armDozer};
    });

  return {
    players,
    turn: getFirstTurnPlayer(players[0], players[1]),
    count: 0
  };
}