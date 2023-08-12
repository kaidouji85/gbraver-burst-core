import { z } from "zod";

import {
  BurstRecoverBattery,
  BurstRecoverBatterySchema,
} from "./burst-recover-battery";

/** 連続攻撃 */
export type ContinuousAttack = BurstRecoverBattery &
  Readonly<{
    type: "ContinuousAttack";
  }>;

/** ContinuousAttack zodスキーマ */
export const ContinuousAttackSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("ContinuousAttack"),
});

/**
 * 任意オブジェクトをContinuousAttackにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseContinuousAttack = (
  origin: unknown,
): ContinuousAttack | null => {
  const result = ContinuousAttackSchema.safeParse(origin);
  return result.success ? result.data : null;
};
