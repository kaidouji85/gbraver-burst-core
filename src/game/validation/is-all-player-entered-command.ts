import type { Player } from "../../player/player";
import type { PlayerCommand } from "../command/player-command";

/**
 * 全プレイヤーがコマンド入力したか否かを判定する
 *
 * @param players ゲーム参加プレイヤー
 * @param commands 入力したコマンド
 * @return 判定結果、trueで全プレイヤーがコマンド入力した
 */
export function isAllPlayerEnteredCommand(
  players: [Player, Player],
  commands: [PlayerCommand, PlayerCommand],
): boolean {
  return (
    players
      .map((player) =>
        commands.find((command) => command.playerId === player.playerId),
      )
      .filter((v) => v).length === 2
  );
}
