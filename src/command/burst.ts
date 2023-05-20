import { z } from "zod";

/** バーストコマンド */
export type BurstCommand = {
  type: "BURST_COMMAND";
};

/** バーストコマンド zodスキーマ */
export const BurstCommandSchema = z.object({
  type: z.literal("BURST_COMMAND"),
});

/**
 * 指定したコマンドをバーストコマンドにパースする
 * @param origin パースするコマンド
 * @return パース結果、パースできない場合はnull
 */
export function parseBurstCommand(origin: unknown): BurstCommand | null {
  const result = BurstCommandSchema.safeParse(origin);
  return result.success ? result.data : null;
}
