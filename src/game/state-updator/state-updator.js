// @flow

import type {GameStateX, GameState} from '../../state/game-state';

/**
 * ステート更新
 * 
 * @template X 最新のゲームステートの効果
 */
export class StateUpdator<X> {
  stateHistory: GameState[];
  lastState: GameStateX<X>;

  constructor(stateHistory: GameState[], lastState: GameStateX<X>) {
    this.stateHistory = stateHistory;
    this.lastState = lastState;
  }

  to<Y>(fn: (v: StateUpdator<X>) => StateUpdator<Y>): StateUpdator<Y> {
    return fn(this);
  }
}

export function start<X>(state: GameStateX<X>): StateUpdator<X> {
  return new StateUpdator([state], state);
}

export function chain<X, Y>(fn: (v: GameStateX<X>) => GameStateX<Y>): ((v: StateUpdator<X>) => StateUpdator<Y>) {
  return (v: StateUpdator<X>): StateUpdator<Y> =>  {
    const lastState = fn(v.lastState);
    const stateHistory = [...v.stateHistory, (lastState: any)];
    return new StateUpdator(stateHistory, lastState);
  }
}