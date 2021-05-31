// @flow

import type {GameStateX, GameState} from '../../state/game-state';

export interface StateChain<X> {
  stateHistory: GameState[];
  lastState: GameStateX<X>;
  chain<Y>(fn: (v: GameStateX<X>) => StateChain<Y>): StateChain<Y>;
}

export class SimpleStateChain<X> implements StateChain<X> {
  stateHistory: GameState[];
  lastState: GameStateX<X>;

  constructor(state: GameStateX<X>, history: GameState[]) {
    this.stateHistory = [...history, (state: any)];
    this.lastState = state;
  }

  chain<Y>(fn: (v: GameStateX<X>) => StateChain<Y>): StateChain<Y> {
    const result = fn(this.lastState);
    const stateHistory = [...this.stateHistory, ...result.stateHistory];
    return new SimpleStateChain(result.lastState, stateHistory);
  }
}