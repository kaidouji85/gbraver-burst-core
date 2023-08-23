import { z } from "zod";

/** コマンド未入力状態 */
export type EmptyCommand = Readonly<{
  type: "EMPTY_COMMAND";
}>;

/** コマンド未入力状態 zodスキーマ */
export const EmptyCommandSchema = z.object({
  type: z.literal("EMPTY_COMMAND"),
});
