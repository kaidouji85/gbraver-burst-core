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

/**
 * 任意オブジェクトをBurstRecoverBatteryにパースする
 * @param origin パース元
 * @return パース結果、パースに失敗した場合はnull
 */
export const parseBurstRecoverBattery = (origin: unknown): BurstRecoverBattery | null => {
  const result = BurstRecoverBatterySchema.safeParse(origin);
  return result.success ? result.data : null;
}
