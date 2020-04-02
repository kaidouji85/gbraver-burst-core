// @flow

import type {BattleResult, GameState, PlayerId} from "../..";

/**
 * 防御側の体勢を整える
 *
 * @param lastState 最新の状態
 * @param result 戦闘結果
 * @param defender 防御側のプレイヤーID
 * @return 更新結果
 */
export function rightItself(lastState: GameState, result: BattleResult, defender: PlayerId): GameState {
  return {
    ...lastState,
    effect: {
      name: 'RightItself',
      defender: defender,
      battleResult: result,
    }
  };
}