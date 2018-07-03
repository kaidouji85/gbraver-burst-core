// @flow

import type {GameState} from "../../game-state/game-state";
import {getNextActivePlayer} from "./next-active-player";
import {getRecoveredBattery} from "./get-recovered-battery";

export const BATTERY_RECOVERY_VALUE = 3;

export function turnChange(lastState: GameState): GameState {
  return {
    ...lastState,
    activePlayerId: getNextActivePlayer(
      lastState.activePlayerId,
      lastState.players.map(v => v.playerId)
    ),
    players: lastState.players.map(v => ({
      ...v,
      armdozer: {
        ...v.armdozer,
        battery: getRecoveredBattery(v.armdozer.battery, v.armdozer.maxBattery, BATTERY_RECOVERY_VALUE)
      }
    })),
    effect: {name: 'TurnChange'}
  };
}
