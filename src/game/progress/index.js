// @flow

import type {GameState} from "../state/game-state";
import {burstFlow, isBurstFlow} from "./burst-flow";
import {battleFlow} from "./battle-flow";
import type {PlayerCommand} from "../..";

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

