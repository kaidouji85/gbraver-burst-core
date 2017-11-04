// @flow
import type {ArmDozerBasicStatus, ArmDozerId, BattleState, PlayerId} from '../flow-type';
import {createArmDozerBattleState} from './create-armdozer-battle-state';
import {getFirstTurnPlayer} from './get-first-turn-payer';
import {getArmDozerData} from "./get-armdozer-data";

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
 * @param masters アームドーザデータ
 * @param player1 1人目プレイヤーの情報
 * @param player2 2人目プレイヤーの情報
 * @return 戦闘状態
 */
export const createInitialState = (masters: ArmDozerBasicStatus[] = []) => (player1: PlayerInfo, player2: PlayerInfo ): BattleState => {
  const players = [player1, player2]
    .map(p => {
      const target = getArmDozerData(p.armDozerId, masters);
      const armDozer = createArmDozerBattleState(target);
      return {playerId: p.playerId, armDozer};
    });

  return {
    players,
    turn: getFirstTurnPlayer(players[0], players[1]),
    count: 0
  };
};