// @flow

import {GameFlow} from "./game-flow";
import type {GameState} from "../../state/game-state";
import type {Effect} from "../../effect";

export function repeat<X>(origin: GameFlow<X>, fns: ((v: GameState) => GameState)[]): GameFlow<Effect> {
  const updates = fns.reduce((history: GameState[], fn) => {
    const lastState = history[history.length - 1];
    const update = fn(lastState);
    return [...history, update];
  }, [(origin.lastState: any)])
    .slice(1);
  const newStateHistory = [...origin.stateHistory, ...updates];
  const newLastState = updates[updates.length - 1];
  return new GameFlow(newStateHistory, newLastState);
}