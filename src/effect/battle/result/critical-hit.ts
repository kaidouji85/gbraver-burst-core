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
 * クリティカルヒットの戦闘結果を生成する
 *
 * @returns クリティカルヒットの戦闘結果
 */
export function criticalHit(): CriticalHit {
  return {
    name: "CriticalHit",
    damage: 9999,
  };
}
