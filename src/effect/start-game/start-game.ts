import { z } from "zod";

/** ゲーム開始 */
export type StartGame = Readonly<{
  name: "StartGame";
}>;

/** StartGame zodスキーマ */
export const StartGameSchema = z.object({
  name: z.literal("StartGame"),
});
