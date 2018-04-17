// @flow

import type {GameState} from "../../game-state/game-state";
import type {PhaseName} from "../../phase/phase-name";
import type {PlayerId} from "../../player/player";

export function doTurnChange(lastState: GameState, phase: PhaseName): GameState {
  return {
    ...lastState,
    phase,
    activePlayer: getNextActivePlayer(lastState),
    effect: {name: 'TurnChange'}
  };
}

function getNextActivePlayer(lastState: GameState): PlayerId {
  const notActivePlayer = lastState.players
    .filter(v => v.playerId !== lastState.activePlayerId)
    .map(v => v.playerId);
  if (notActivePlayer.length === 1) {
    return notActivePlayer[0];
  }

  return '';
}