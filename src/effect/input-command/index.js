// @flow

import type {GameState} from "../../game-state/game-state";
import {getEnableBatteryCommand} from "./enable-battery-command";
import {getEnableBurstCommand} from "./enable-burst-command";

export function inputCommand(lastState: GameState): GameState {
  return {
    ...lastState,
    effect: {
      name: 'InputCommand',
      players: lastState.players.map(v => ({
        playerId: v.playerId,
        command: [
          ...getEnableBatteryCommand(v.armdozer),
          ...getEnableBurstCommand(v.armdozer)
        ]
      }))
    }
  };
}