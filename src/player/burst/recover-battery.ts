import {BurstRecoverBattery, BurstRecoverBatterySchema} from "./burst-recover-battery";
import {z} from "zod";

/** バッテリー回復 */
export type RecoverBattery = BurstRecoverBattery &
  Readonly<{
    type: "RecoverBattery";
  }>;

/** RecoverBattery zodスキーマ */
export const RecoverBatterySchema = BurstRecoverBatterySchema.extend({
  type: z.literal("RecoverBattery"),
});

/**
 * 任意オブジェクトをRecoverBatteryにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseRecoverBattery = (origin: unknown): RecoverBattery | null => {
  const result = RecoverBatterySchema.safeParse(origin);
  return result.success ? result.data : null;
};