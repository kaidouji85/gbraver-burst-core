import { z } from "zod";

/** クリティカルヒット */
export type CriticalHit = Readonly<{
  name: "CriticalHit";
  damage: number;
}>;

/** CriticalHit zodスキーマ */
export const CriticalHitSchema = z.object({
  name: z.literal("CriticalHit"),
  damage: z.number(),
});

/**
 * 任意オブジェクトをCriticalHitにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseCriticalHit = (origin: unknown): CriticalHit | null => {
  const result = CriticalHitSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/**
 * クリティカルヒットの戦闘結果を生成する
 *
 * @return クリティカルヒットの戦闘結果
 */
export function criticalHit(): CriticalHit {
  return {
    name: "CriticalHit",
    damage: 9999,
  };
}
