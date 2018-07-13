// @flow

import type {GameState} from "../../game-state/game-state";
import {getEnableBatteryCommand} from "./enable-battery-command";
import {getEnableBurstCommand} from "./enable-burst-command";

/**
 * コマンド入力フェイズのステートを生成する
 *
 * @param lastState 更新前の状態
 * @return コマンド入力状態
 */
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