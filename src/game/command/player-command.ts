import type { Command } from "../../command/command";
import type { PlayerId } from "../../player/player";

/**
 * プレイヤーコマンド（型指定あり）
 * @template X コマンド
 */
export type PlayerCommandX<X> = Readonly<{
  /** プレイヤーID */
  playerId: PlayerId;
  /** コマンド */
  command: X;
}>;

/** プレイヤーコマンド */
export type PlayerCommand = PlayerCommandX<Command>;
