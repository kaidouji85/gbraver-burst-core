// @flow

import type {GameState} from "../game-state/game-state";
import type {PlayerCommand} from "../command/player-command";
import {turnChange} from "../effect/turn-change/index";
import {inputCommand} from "../effect/input-command/index";

/** ゲーム状態を更新する関数 */
type StateUpdater = (state: GameState) => GameState;

/**
 * 戦闘フェイズを実行
 *
 * @param lastState 最新の状態
 * @param commands プレイヤーのコマンド
 * @return 更新結果
 */
export function doBattle(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  const effects: StateUpdater[] = [
    state => turnChange(state),
    state => inputCommand(state)
  ];

  const updateList = effects.reduce((stateList: GameState[], update: StateUpdater) =>{
    const updateState = update(stateList[stateList.length - 1]);
    return stateList.concat(updateState);
  }, [lastState]);

  // updateListの先頭はlastStateになる
  // 本関数は更新分のみを返却したいので、lastStateが含まれる先頭要素をカットしている
  return updateList.slice(1);
}