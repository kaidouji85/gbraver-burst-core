// @flow
import type {ArmDozerBasicStatus, BattleState, PlayerId} from '../flow-type';
import {createArmDozerBattleState} from './create-armdozer-battle-state';
import {getFirstTurnPlayer} from './get-first-turn-payer';

/** プレイヤー情報 */
export type PlayerInfo = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** アームドーザデータ */
  armDozer: ArmDozerBasicStatus;
};

/**
 * ゲームの初期状態を生成する
 *
 * @param player1
 * @param player2
 */
export function create(player1: PlayerInfo, player2: PlayerInfo): BattleState {
  const players = [player1, player2]
    .map(p => {
      const armDozer = createArmDozerBattleState(p.armDozer);
      return {playerId: p.playerId, armDozer};
    });

  return {
    players,
    turn: getFirstTurnPlayer(players[0], players[1]),
    count: 0
  };
}