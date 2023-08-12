import {z} from "zod";

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

/**
 * 任意オブジェクトをTurnLimitEffectにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseTurnLimitEffect = (
  origin: unknown,
): TurnLimitEffect | null => {
  const result = TurnLimitEffectSchema.safeParse(origin);
  return result.success ? result.data : null;
};