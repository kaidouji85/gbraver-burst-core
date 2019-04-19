// @flow

import type {GameState} from "../game-state/game-state";
import type {PlayerCommand} from "../command/player-command";
import {turnChange} from "../effect/turn-change/index";
import {inputCommand} from "../effect/input-command/index";
import {battle} from "../effect/battle";

/** 効果適用関数 */
export type ApplyEffect = (state: GameState) => GameState;

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
    return stateList.concat(updateState);
  }, [lastState]);

  // updateListの先頭はlastStateになる
  // 本関数は更新分のみを返却したいので、lastStateが含まれる先頭要素をカットしている
  return updateList.slice(1);
}