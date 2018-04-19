// @flow

import type {GameState} from "../../game-state/game-state";
import type {PhaseName} from "../../phase/phase-name";
import {getNextActivePlayer} from "./next-active-player";

export function doTurnChange(lastState: GameState, phase: PhaseName): GameState {
  return {
    ...lastState,
    phase,
    activePlayerId: getNextActivePlayer(
      lastState.activePlayerId,
      lastState.players.map(v => v.playerId)
    ),
    effect: {name: 'TurnChange'}
  };
}
