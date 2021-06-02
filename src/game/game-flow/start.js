// @flow

import type {GameStateX} from '../../state/game-state';
import {GameFlowWithHistory} from './game-flow';

/**
 * ゲームフローを開始する
 *
 * @template X ゲームステートの効果
 * @param state ゲームステート
 * @return ゲームフロー
 */
export function start<X>(state: GameStateX<X>): GameFlowWithHistory<X> {
  return new GameFlowWithHistory([(state: any)], state);
}