import type { BatteryCommand } from "../../command/battery";
import type { GameState } from "../../state/game-state";
import type { PlayerCommand, PlayerCommandX } from "../command/player-command";
import { battleFlow } from "./battle-flow";
import {
  effectActivationFlow,
  isEffectActivationFlow,
} from "./effect-activation-flow";

/**
 * ゲームを進める
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲーム状態
 */
export function progress(
  lastState: GameState,
  commands: [PlayerCommand, PlayerCommand]
): GameState[] {
  if (isEffectActivationFlow(commands)) {
    return effectActivationFlow(lastState, commands);
  }

  if (
    commands[0].command.type === "BATTERY_COMMAND" &&
    commands[1].command.type === "BATTERY_COMMAND"
  ) {
    const command1: BatteryCommand = commands[0].command;
    type CastedCommand1 = PlayerCommandX<typeof command1>;
    const playerCommand1 = commands[0] as any as CastedCommand1; // eslint-disable-line @typescript-eslint/no-explicit-any
    const command2: BatteryCommand = commands[1].command;
    type CastedCommand2 = PlayerCommandX<typeof command2>;
    const playerCommand2 = commands[1] as any as CastedCommand2; // eslint-disable-line @typescript-eslint/no-explicit-any
    return battleFlow(lastState, [playerCommand1, playerCommand2]);
  }

  throw new Error("invalid commands");
}
