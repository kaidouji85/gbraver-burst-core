// @flow

import type {GameStateX} from '../../state/game-state';
import {GameFlow} from './game-flow';
import {forceUpcastGameState} from "../../state/game-state";

/**
 * ゲームフローを開始する
 *
 * @template X ゲームステートの効果
 * @param state ゲームステート
 * @return ゲームフロー
 */
export function start<X>(state: GameStateX<X>): GameFlow<X> {
  return new GameFlow([forceUpcastGameState(state)], state);
}