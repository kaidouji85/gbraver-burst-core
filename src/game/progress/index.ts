import { BatteryCommand } from "../../command/battery";
import { GameState } from "../../state/game-state";
import { PlayerCommand, PlayerCommandX } from "../command/player-command";
import { battleFlow } from "./battle-flow";
import { effectActivationFlow } from "./effect-activation-flow";
import { isEffectActivationFlow } from "./effect-activation-flow/is-effect-activation-flow";

/**
 * バッテリーコマンドにキャストする
 * @param origin キャスト元
 * @returns キャスト結果、キャストできない場合はnull
 */
const castBatteryCommand = (
  origin: PlayerCommand,
): PlayerCommandX<BatteryCommand> | null =>
  origin.command.type === "BATTERY_COMMAND"
    ? { ...origin, command: origin.command }
    : null;

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

  const batteryCommand1 = castBatteryCommand(commands[0]);
  const batteryCommand2 = castBatteryCommand(commands[1]);
  if (batteryCommand1 && batteryCommand2) {
    return battleFlow(lastState, [batteryCommand1, batteryCommand2]);
  }

  throw new Error("invalid commands");
}
