// @flow

import type {GameState} from "../../state/game-state";
import type {PlayerCommand} from "../../player/command/player-command";
import {burstFlow, isBurstFlow} from "./burst-flow";
import {battleFlow} from "./battle-flow";

/**
 * ゲームを進める
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲーム状態
 */
export function progress(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  if (isBurstFlow(commands)) {
    return burstFlow(lastState, commands);
  }

  return battleFlow(lastState, commands);
}

