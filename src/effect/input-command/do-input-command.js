// @flow

import type {GameState} from "../../game-state/game-state";
import {getEnableCommand} from "./enable-command";

export function doInputCommand(lastState: GameState): GameState {
  return {
    ...lastState,
    effect: {
      name: 'InputCommand',
      players: lastState.players.map(v => ({
        playerId: v.playerId,
        command: getEnableCommand(v)
      }))
    }
  };
}