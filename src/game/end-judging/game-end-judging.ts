import type { PlayerId } from "../../player/player";

/** ゲーム終了判定の結果をまとめたもの */
export type GameEndJudging = GameOver | EvenMatch | GameContinue;

/** 勝負あり */
export type GameOver = Readonly<{
  type: "GameOver";
  /** 勝利したプレイヤーのID */
  winner: PlayerId;
}>;

/** 引き分け */
export type EvenMatch = Readonly<{
  type: "EvenMatch";
}>;

/** ゲーム続行 */
export type GameContinue = Readonly<{
  type: "GameContinue";
}>;
