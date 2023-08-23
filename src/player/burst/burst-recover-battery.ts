import { z } from "zod";

/** 全バースト共通で利用するバッテリー回復プロパティ */
export type BurstRecoverBattery = Readonly<{
  /** バッテリー回復量 */
  recoverBattery: number;
}>;

/** BurstRecoverBattery zodスキーマ */
export const BurstRecoverBatterySchema = z.object({
  recoverBattery: z.number(),
});
