// @flow

import type {GameStateX} from '../../state/game-state';
import {GameFlow} from './game-flow';

export function chain<X, Y>(fn: (v: GameStateX<X>) => GameStateX<Y>): ((v: GameFlow<X>) => GameFlow<Y>) {
  return (v: GameFlow<X>): GameFlow<Y> =>  {
    const lastState = fn(v.lastState);
    const stateHistory = [...v.stateHistory, (lastState: any)];
    return new GameFlow(stateHistory, lastState);
  }
}