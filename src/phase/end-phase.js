// @flow

import {doTurnChange} from "../effect/turn-change/do-turn-change";
import {PhaseNameList} from "./phase-name";
import type {GameState} from "../game-state/game-state";

export function doEndPhase(lastState: GameState): GameState[] {
  const turnChange = doTurnChange(lastState, PhaseNameList.END_PHASE);
  return [turnChange];
}