// @flow

import type {GameState} from "../../game-state/game-state";
import type {PhaseName} from "../../phase/phase-name";
import {getEnableCommand} from "./enable-command";

export function doInputCommand(lastState: GameState, phase: PhaseName): GameState {
  return {
    ...lastState,
    phase,
    effect: {
      name: 'InputCommand',
      players: lastState.players.map(v => ({
        playerId: v.playerId,
        command: getEnableCommand(v)
      }))
    }
  };
}