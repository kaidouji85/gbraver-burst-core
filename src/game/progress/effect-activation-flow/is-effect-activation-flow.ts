import { PlayerCommand } from "../../command/player-command";

/**
 * 効果発動フローを行うか否かを判定する
 * @param commands プレイヤーが選択したコマンド
 * @returns 判定結果、trueでバーストフェイズを行う
 */
export function isEffectActivationFlow(
  commands: [PlayerCommand, PlayerCommand],
): boolean {
  const types = commands.map((v) => v.command.type);
  return (
    types.includes("BURST_COMMAND") || types.includes("PILOT_SKILL_COMMAND")
  );
}
