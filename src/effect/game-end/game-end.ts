import { z } from "zod";

import {
  EvenMatch,
  EvenMatchSchema,
  GameOver,
  GameOverSchema,
} from "../../game/end-judging/game-end-judging";

/**
 * ゲーム終了判定
 * ここにはContinueGame以外のGameEndJudgingがセットされる
 */
export type GameEndResult = GameOver | EvenMatch;

/** GameEndResult zodスキーマ */
export const GameEndResultSchema = z.union([GameOverSchema, EvenMatchSchema]);

/**
 * ゲーム終了
 * @template {X} ゲーム終了判定
 */
export type GameEndX<X> = Readonly<{
  name: "GameEnd";
  /** 終了判定の結果 */
  result: X;
}>;

/** ゲーム終了 */
export type GameEnd = GameEndX<GameEndResult>;

/** GameEnd zodスキーマ */
export const GameEndSchema = z.object({
  name: z.literal("GameEnd"),
  result: GameEndResultSchema,
});
