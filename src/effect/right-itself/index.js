// @flow

import type {Battle, GameState} from "../..";

/**
 * 防御側の体勢を整える
 *
 * @param lastState 最新の状態
 * @param result 戦闘結果
 * @param defender 防御側のプレイヤーID
 * @return 更新結果
 */
export function rightItself(lastState: GameState, battle: Battle): GameState {
  const defender = lastState.players.find(v => v.playerId !== battle.attacker);
  if (!defender) {
    return lastState;
  }

  return {
    ...lastState,
    effect: {
      name: 'RightItself',
      defender: defender.playerId,
      battleResult: battle.result,
    }
  };
}