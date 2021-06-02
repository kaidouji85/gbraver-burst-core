// @flow

import type {GameState} from "../../state/game-state";
import {effectActivationFlow, isEffectActivationFlow} from "./effect-activation-flow";
import {deprecated_battleFlow} from "./battle-flow";
import type {PlayerCommand} from "../command/player-command";

/**
 * ゲームを進める
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲーム状態
 */
export function progress(lastState: GameState, commands: [PlayerCommand, PlayerCommand]): GameState[] {
  if (isEffectActivationFlow(commands)) {
    return effectActivationFlow(lastState, commands);
  }

  return deprecated_battleFlow(lastState, commands);
}

