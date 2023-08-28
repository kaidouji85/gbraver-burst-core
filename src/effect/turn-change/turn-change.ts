import { z } from "zod";

/** ターン変更 */
export type TurnChange = Readonly<{
  name: "TurnChange";
  /** バッテリー回復量 */
  recoverBattery: number;
}>;

/** TurnChange zodスキーマ */
export const TurnChangeSchema: z.ZodSchema<TurnChange> = z.object({
  name: z.literal("TurnChange"),
  recoverBattery: z.number(),
});
