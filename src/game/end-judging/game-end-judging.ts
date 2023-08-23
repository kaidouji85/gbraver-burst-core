import { z } from "zod";

import { PlayerId, PlayerIdSchema } from "../../player/player";

/** 勝負あり */
export type GameOver = Readonly<{
  type: "GameOver";
  /** 勝利したプレイヤーのID */
  winner: PlayerId;
}>;

/** GameOver zodスキーマ */
export const GameOverSchema = z.object({
  type: z.literal("GameOver"),
  winner: PlayerIdSchema,
});

/**
 * 任意オブジェクトをGameOverにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseGameOver = (origin: unknown): GameOver | null => {
  const result = GameOverSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** 引き分け */
export type EvenMatch = Readonly<{
  type: "EvenMatch";
}>;

/** EvenMatch zodスキーマ */
export const EvenMatchSchema = z.object({
  type: z.literal("EvenMatch"),
});

/** ゲーム続行 */
export type GameContinue = Readonly<{
  type: "GameContinue";
}>;

/** GameContinue zodスキーマ */
export const GameContinueSchema = z.object({
  type: z.literal("GameContinue"),
});

/** ゲーム終了判定の結果をまとめたもの */
export type GameEndJudging = GameOver | EvenMatch | GameContinue;

/** GameEndJudging zodスキーマ */
export const GameEndJudgingSchema = z.union([
  GameOverSchema,
  EvenMatchSchema,
  GameContinueSchema,
]);
