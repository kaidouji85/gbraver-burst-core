// @flow

import type {GameStateX} from '../../state/game-state';
import {GameFlow} from './game-flow';

export function start<X>(state: GameStateX<X>): GameFlow<X> {
  return new GameFlow([(state: any)], state);
}