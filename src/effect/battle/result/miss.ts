import { z } from "zod";

/** ミス */
export type Miss = Readonly<{
  name: "Miss";
}>;

/** Miss zodスキーマ */
export const MissSchema = z.object({
  name: z.literal("Miss"),
});

/**
 * 任意オブジェクトをMissにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseMiss = (origin: unknown): Miss | null => {
  const result = MissSchema.safeParse(origin);
  return result.success ? result.data : null;
};
