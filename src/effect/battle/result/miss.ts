import { z } from "zod";

/** ミス */
export type Miss = Readonly<{
  name: "Miss";
}>;

/** Miss zodスキーマ */
export const MissSchema = z.object({
  name: z.literal("Miss"),
});
