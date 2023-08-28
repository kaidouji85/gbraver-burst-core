import { z } from "zod";

import { PlayerId,PlayerIdSchema } from "../../player/player";
import { BattleResult,BattleResultSchema } from "../battle/result/battle-result";

/** 防御側の体勢を立て直す */
export type RightItself = Readonly<{
  name: "RightItself";
  /** 防御側プレイヤー */
  defender: PlayerId;
  /** 戦闘結果 */
  battleResult: BattleResult;
}>;

/** RightItself zodスキーマ */
export const  RightItselfSchema = z.object({
  name: z.literal("RightItself"),
  defender: PlayerIdSchema,
  battleResult: BattleResultSchema,
});
