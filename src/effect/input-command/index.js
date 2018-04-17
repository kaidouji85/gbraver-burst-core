// @flow

import type {PlayerId} from "../../player/player";
import type {Command} from "../../command/command";
import type {GameState} from "../../game-state/game-state";
import {getEnableBatteryCommand} from "./enable-battery-command";
import {getEnableBurstCommand} from "./enable-burst-command";
import type {OpenPlayerState} from "../../game-state/open-player-state";

/** コマンド入力 */
export type InputCommand = {
  name: 'InputCommand',
  players: EnableCommand[]
};

/** プレイヤー毎の入力可能コマンドをまとめたもの */
export type EnableCommand = {
  playerId: PlayerId,
  command: Command[]
};

export function doInputCommand(state: GameState): GameState {
  const players: EnableCommand[] = state.openState.players.map(v => ({
    playerId: v.playerId,
    command: getEnableCommand(v)
  }));
  const effect: InputCommand = {
    name: 'InputCommand',
    players: players
  };
  return {
    ...state,
    openState: {
      ...state.openState,
      effect: effect
    }
  };
}

export function getEnableCommand(player: OpenPlayerState): Command[] {
  return [
    ...getEnableBatteryCommand(player.armdozer),
    ...getEnableBurstCommand(player.armdozer)
  ];
}