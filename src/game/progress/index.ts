import { BatteryCommand } from "../../command/battery";
import { GameState } from "../../state/game-state";
import { PlayerCommand, PlayerCommandX } from "../command/player-command";
import { battleFlow } from "./battle-flow";
import { effectActivationFlow } from "./effect-activation-flow";
import { isEffectActivationFlow } from "./effect-activation-flow/is-effect-activation-flow";

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
  if (isEffectActivationFlow(commands)) {
    return effectActivationFlow(lastState, commands);
  }

  const batteryCommands: PlayerCommandX<BatteryCommand>[] = commands
    .map((c) => {
      const { command } = c;
      return command.type === "BATTERY_COMMAND" ? { ...c, command } : null;
    })
    .filter((c) => c !== null);
  const batteryCommand1 = batteryCommands.at(0);
  const batteryCommand2 = batteryCommands.at(1);
  if (batteryCommand1 && batteryCommand2) {
    return battleFlow(lastState, [batteryCommand1, batteryCommand2]);
  }

  throw new Error("invalid commands");
}
