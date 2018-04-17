// @flow

import type {GameState} from "../game-state/game-state";
import {doInputCommand} from "../effect/input-command/do-input-command";
import {PhaseNameList} from "./phase-name";

export function doCommandPhase(lastPhase: GameState): GameState[] {
  const inputCommand = doInputCommand(lastPhase, PhaseNameList.COMMAND_PHASE);
  return [inputCommand];
}