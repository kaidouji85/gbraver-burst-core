import { z } from "zod";

/** ターン期限付きのエフェクト */
export type TurnLimitEffect = Readonly<{
  type: "TurnLimit";
  /** 効果持続ターン */
  remainingTurn: number;
}>;

/** ターン期限付きのエフェクト zodスキーマ */
export const TurnLimitEffectSchema = z.object({
  type: z.literal("TurnLimit"),
  remainingTurn: z.number(),
});
