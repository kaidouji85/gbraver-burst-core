import { BatteryCommand } from "../../command/battery";
import { GameState } from "../../state/game-state";
import { PlayerCommand, PlayerCommandX } from "../command/player-command";
import { battleFlow } from "./battle-flow";
import { effectActivationFlow } from "./effect-activation-flow";
import { isEffectActivationFlow } from "./effect-activation-flow/is-effect-activation-flow";

/**
 * PlayerCommandX<BatteryCommand>の型ガード関数
 * @param command 判定元のコマンド
 * @returns 判定結果
 */
const isBatteryCommand = (
  command: PlayerCommand,
): command is PlayerCommandX<BatteryCommand> =>
  command.command.type === "BATTERY_COMMAND";

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

  if (isBatteryCommand(commands[0]) && isBatteryCommand(commands[1])) {
    return battleFlow(lastState, [commands[0], commands[1]]);
  }

  throw new Error("invalid commands");
}
