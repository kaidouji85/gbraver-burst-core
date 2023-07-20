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

/**
 * 指定したコマンドをバッテリーコマンドにパースする
 * @param origin パースするコマンド
 * @return パース結果、パースできない場合はnull
 */
export function parseBatteryCommand(origin: unknown): BatteryCommand | null {
  const result = BatteryCommandSchema.safeParse(origin);
  return result.success ? result.data : null;
}
