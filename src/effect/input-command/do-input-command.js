// @flow
import type {OpenPlayerState} from "../../game-state/open-player-state";
import type {Command} from "../../command/command";
import {getEnableBatteryCommand} from "./enable-battery-command";
import {getEnableBurstCommand} from "./enable-burst-command";
import type {GameState} from "../../game-state/game-state";
import type {EnableCommand, InputCommand} from "./input-command";

/**
 * コマンド入力状態に移行する
 *
 * @param state 現在の状態
 * @return 更新した状態
 */
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