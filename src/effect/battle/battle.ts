import { z } from "zod";

import { PlayerId, PlayerIdSchema } from "../../player/player";
import { BattleResult, BattleResultSchema } from "./result/battle-result";

/**
 * 戦闘（型指定あり）
 * @template X 戦闘結果
 */
export type BattleX<X> = Readonly<{
  name: "Battle";
  /** 攻撃側プレイヤー */
  attacker: PlayerId;
  /** 死亡フラグ、trueで防御側が死亡 */
  isDeath: boolean;
  /** 戦闘結果 */
  result: X;
}>;

/** 戦闘 */
export type Battle = BattleX<BattleResult>;

/** Battle zodスキーマ */
export const BattleSchema = z.object({
  name: z.literal("Battle"),
  attacker: PlayerIdSchema,
  isDeath: z.boolean(),
  result: BattleResultSchema,
});
