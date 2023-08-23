import { z } from "zod";

import { Command,  CommandSchema } from "../../command/command";
import { PlayerId } from "../../player/player";

/** コマンドが自由に選択できるケース */
export type Selectable = Readonly<{
  /** プレイヤーID */
  playerId: PlayerId;
  /** コマンドが選択できるか否かのフラグ、自由に選択できるのでtrue固定 */
  selectable: true;
  /** プレイヤーが選択できるコマンド */
  command: Command[];
}>;

/** Selectable zodスキーマ */
export const SelectableSchema = z.object({
  playerId: z.string(),
  selectable: z.literal(true),
  command: z.array(CommandSchema),
});

/** コマンドが強制されているケース */
export type NoChoice = Readonly<{
  /** プレイヤーID */
  playerId: PlayerId;
  /** コマンドが選択できるか否かのフラグ、コマンド強制されているのでfalse固定 */
  selectable: false;
  /** プレイヤーが次のターンに実行するコマンド */
  nextTurnCommand: Command;
}>;

/** コマンド入力 */
export type InputCommand = Readonly<{
  name: "InputCommand";
  /** 各プレイヤーのコマンド */
  players: Array<Selectable | NoChoice>;
}>;