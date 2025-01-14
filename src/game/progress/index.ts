import { GameState } from "../../state/game-state";
import { PlayerCommand } from "../command/player-command";
import { battleFlow } from "./battle-flow";
import { effectActivationFlow } from "./effect-activation-flow";

/**
 * ゲームを進める
 * @param lastState 最後の状態
 * @param commands コマンド
 * @returns 更新されたゲーム状態
 */
export function progress(
  lastState: GameState,
  commands: [PlayerCommand, PlayerCommand],
): GameState[] {
  const batteryCommands = commands.map((c) => {
    const { command } = c;
    return command.type === "BATTERY_COMMAND" ? { ...c, command } : null;
  });
  const batteryCommand1 = batteryCommands.at(0);
  const batteryCommand2 = batteryCommands.at(1);
  if (batteryCommand1 && batteryCommand2) {
    return battleFlow(lastState, [batteryCommand1, batteryCommand2]);
  }

  return effectActivationFlow(lastState, commands);
}
