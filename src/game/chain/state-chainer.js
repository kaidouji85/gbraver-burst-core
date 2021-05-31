// @flow

import type {GameStateX, GameState} from '../../state/game-state';

export interface StateChainer<X> {
  stateHistory(): GameState[];
  lastState(): GameStateX<X>;
  chain<Y>(fn: (v: GameStateX<X>) => StateChainer<Y>): StateChainer<Y>;
}

export class SimpleStateChainer<X> implements StateChainer<X> {
  _stateHistory: GameState[];

  constructor(history: GameState[], state: GameStateX<X>) {
    this._stateHistory = [...history, (state: any)];
  }

  stateHistory(): GameState[] {
    return this._stateHistory;
  }

  lastState(): GameStateX<X> {
    return ((this.stateHistory[this.stateHistory.length - 1]): any);
  }

  chain<Y>(fn: (v: GameStateX<X>) => StateChainer<Y>): StateChainer<Y> {
    const result = fn(this.lastState());
    const stateHistory = [...this.stateHistory(), ...result.stateHistory().slice(0, -1)];
    return new SimpleStateChainer(stateHistory, result.lastState());
  }
}