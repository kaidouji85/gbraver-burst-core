// @flow

import type {GameState} from "../../state/game-state";
import {effectActivationFlow, isEffectActivationFlow} from "./effect-activation-flow";
import {battleFlow} from "./battle-flow";
import type {PlayerCommand} from "../command/player-command";

/**
 * ゲームを進める
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲーム状態
 */
export function progress(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  if (isEffectActivationFlow(commands)) {
    return effectActivationFlow(lastState, commands);
  }

  return battleFlow(lastState, commands);
}

