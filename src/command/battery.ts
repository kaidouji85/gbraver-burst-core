import { z } from "zod";

/** バッテリーコマンド */
export type BatteryCommand = Readonly<{
  type: "BATTERY_COMMAND";
  /** 出したバッテリー値 */
  battery: number;
}>;

/** バッテリーコマンド zodスキーマ */
export const BatteryCommandSchema = z.object({
  type: z.literal("BATTERY_COMMAND"),
  battery: z.number().int(),
});
