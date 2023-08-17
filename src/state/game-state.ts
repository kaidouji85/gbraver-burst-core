import type { Effect } from "../effect";
import type { PlayerId } from "../player/player";
import type { PlayerState } from "./player-state";

/**
 * ゲームステート（型指定あり）
 * @template X 発生した効果
 */
export type GameStateX<X> = Readonly<{
  /** プレイヤー毎の状態 */
  players: PlayerState[];
  /** 攻撃側のプレイヤーのID */
  activePlayerId: PlayerId;
  /** このステップで発生した効果 */
  effect: X;
}>;

/** ゲームステート */
export type GameState = GameStateX<Effect>;
