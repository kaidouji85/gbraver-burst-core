// @flow
import type {ArmDozerId, PlayerId} from '../flow-type';
import {armDozers} from '../master/armdozers';
import {createArmDozerBattleState} from './create-armdozer-battle-state';
import {getFirstTurnPlayer} from './get-first-turn-payer';

/** プレイヤー情報 */
export type PlayerInfo = {
  /** プレイヤーID */
  playerId: PlayerId,
  /** プレイヤーが選択したアームドーザのID */
  armDozerId: ArmDozerId
};

/**
 * プレイヤー情報から戦闘状態を生成する
 *
 * @param player1 1人目プレイヤーの情報
 * @param player2 2人目プレイヤーの情報
 * @return 戦闘状態
 */
export function createInitialState(player1: PlayerInfo, player2: PlayerInfo) {
  const players = [player1, player2]
    .map(p => {
      const target = armDozers.find(a => a.id === p.armDozerId) || armDozers[0];
      const armDozer = createArmDozerBattleState(target);
      return {playerId: p.playerId, armDozer};
    });

  return {
    players,
    turn: getFirstTurnPlayer(players[0], players[1]),
    count: 0
  };
}