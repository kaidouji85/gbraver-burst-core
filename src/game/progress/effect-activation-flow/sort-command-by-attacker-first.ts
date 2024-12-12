import { PlayerId } from "../../../player/player";
import { PlayerCommand } from "../../command/player-command";

/**
 * 攻撃側が先頭になるようにコマンドをソートする
 * @param commands コマンド
 * @param lastState 最後の状態
 * @returns ソートされたコマンド
 */
export function sortCommandByAttackerFirst(
  commands: [PlayerCommand, PlayerCommand],
  lastState: { activePlayerId: PlayerId },
): [PlayerCommand, PlayerCommand] {
  const attackerCommand = commands.find(
    (v) => v.playerId === lastState.activePlayerId,
  );
  const defenderCommand = commands.find(
    (v) => v.playerId !== lastState.activePlayerId,
  );
  if (!attackerCommand || !defenderCommand) {
    throw new Error("not found attacker or defender command");
  }

  return [attackerCommand, defenderCommand];
}
