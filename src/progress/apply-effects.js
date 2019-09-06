// @flow

import type {GameState} from "../game-state/game-state";

/**
 * 効果適用関数
 * 戻り値のデータ型により、以下のように動く
 *
 * GameState
 *  戻り値を効果適用結果として扱い、ステートヒストリーに追加する
 * null
 *  状態変更なしと見なし、ステートヒストリーには変化がない
 *
 * @param state 更新前の状態
 * @return 更新結果
 */
export type ApplyEffect = (state: GameState) => ?GameState;

/**
 * 最新状態に効果を適用する
 *
 * @param lastState 最新のゲームステート
 * @param effects 適用する効果一覧
 * @return 効果適用結果
 */
export function applyEffects(lastState: GameState, effects: ApplyEffect[]): GameState[] {
  const updateList = effects.reduce((stateList: GameState[], update: ApplyEffect) =>{
    const updateState = update(stateList[stateList.length - 1]);
    return updateState
      ? [...stateList, updateState]
      : stateList;
  }, [lastState]);

  // updateListの先頭はlastStateになる
  // 本関数は更新分のみを返却したいので、lastStateが含まれる先頭要素をカットしている
  return updateList.slice(1);
}
