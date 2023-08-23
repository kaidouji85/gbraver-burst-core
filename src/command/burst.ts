import { z } from "zod";

/** バーストコマンド */
export type BurstCommand = Readonly<{
  type: "BURST_COMMAND";
}>;

/** バーストコマンド zodスキーマ */
export const BurstCommandSchema = z.object({
  type: z.literal("BURST_COMMAND"),
});
