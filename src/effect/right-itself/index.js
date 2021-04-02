// @flow

import type {GameState, GameStateX} from "../../state/game-state";
import type {Battle} from "../battle/battle";
import type {RightItself} from "./right-itself";

/**
 * 体勢整えを実施するか否かを判定する
 *
 * @param battle 戦闘情報
 * @return 判定結果、trueで実施する
 */
export function canRightItself(battle: Battle): boolean {
  return !battle.isDeath;
}

/**
 * 防御側の体勢を整える
 *
 * @param lastState 最新の状態
 * @param battle 戦闘
 * @return 更新結果、実行不可能な場合はnullを返す
 */
export function rightItself(lastState: GameState, battle: Battle): ?GameStateX<RightItself> {
  const defender = lastState.players.find(v => v.playerId !== battle.attacker);
  if (!defender) {
    return null;
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