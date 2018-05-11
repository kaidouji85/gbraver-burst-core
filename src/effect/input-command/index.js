// @flow

import type {GameState} from "../../game-state/game-state";
import type {PlayerState} from "../../game-state/player-state";
import type {Command} from "../../command/command";
import {getEnableBatteryCommand} from "./enable-battery-command";
import {getEnableBurstCommand} from "./enable-burst-command";

export function inputCommand(lastState: GameState): GameState {
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

export function getEnableCommand(player: PlayerState): Command[] {
  return [
    ...getEnableBatteryCommand(player.armdozer),
    ...getEnableBurstCommand(player.armdozer)
  ];
}