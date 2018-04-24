// @flow

import type {GameState} from "../../game-state/game-state";
import {getNextActivePlayer} from "./next-active-player";

export function doTurnChange(lastState: GameState): GameState {
  return {
    ...lastState,
    activePlayerId: getNextActivePlayer(
      lastState.activePlayerId,
      lastState.players.map(v => v.playerId)
    ),
    effect: {name: 'TurnChange'}
  };
}
