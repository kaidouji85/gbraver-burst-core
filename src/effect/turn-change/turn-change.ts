import { z } from "zod";

/** ターン変更 */
export type TurnChange = Readonly<{
  name: "TurnChange";
  /** バッテリー回復量 */
  recoverBattery: number;
  /**
   * ターン変更の理由
   *
   * "Normal" は通常のターン変更
   * "ContinuousActive" はアクティブプレイヤー継続でのターン変更
   */
  reason: "Normal" | "ContinuousActive";
}>;

/** TurnChange zodスキーマ */
export const TurnChangeSchema: z.ZodSchema<TurnChange> = z.object({
  name: z.literal("TurnChange"),
  recoverBattery: z.number(),
  reason: z.union([z.literal("Normal"), z.literal("ContinuousActive")]),
});
