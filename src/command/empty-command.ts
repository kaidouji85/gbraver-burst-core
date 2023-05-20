import { z } from "zod";

/** コマンド未入力状態 */
export type EmptyCommand = {
  type: "EMPTY_COMMAND";
};

/** コマンド未入力状態 zodスキーマ */
export const EmptyCommandSchema = z.object({
  type: z.literal("EMPTY_COMMAND"),
});

/**
 * コマンド未入力状態をパースする
 * @param origin パースする元
 * @return パース結果、パースできない場合はnull
 */
export function parseEmptyCommand(origin: unknown): EmptyCommand | null {
  const result = EmptyCommandSchema.safeParse(origin);
  return result.success ? result.data : null;
}