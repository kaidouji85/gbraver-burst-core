import type { Effect } from "../effect";
import type { PlayerId } from "../player/player";
import type { PlayerState } from "./player-state";

/**
 * ゲーム状態
 *
 * @template {X} 発生した効果
 */
export type GameStateX<X> = {
  /** プレイヤー毎の状態 */
  players: PlayerState[];

  /** 攻撃側のプレイヤーのID */
  activePlayerId: PlayerId;

  /** このステップで発生した効果 */
  effect: X;
};

/**
 * ゲーム状態
 */
export type GameState = GameStateX<Effect>;

/**
 * GameStateXをGameStateにアップキャストする
 *
 * @typeparam {X} 発生した効果
 * @param origin キャスト元
 * @return キャスト結果
 */
export function upcastGameState<X>(
  origin: GameStateX<X>
): GameStateX<Effect | X> {
  return origin as any as GameStateX<Effect | X>; // eslint-disable-line @typescript-eslint/no-explicit-any
}
