// @flow
import type {PlayerState} from "./player-state";
import type {PlayerId} from "../player/player";
import type {Effect} from "../effect";

/**
 * ゲーム状態
 *
 * @typeparam {X} 発生した効果
 */
export type GameStateX<X> = {
  /** プレイヤー毎の状態 */
  players: PlayerState[],
  /** 攻撃側のプレイヤーのID */
  activePlayerId: PlayerId,
  /** このステップで発生した効果 */
  effect: X,
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
export function upcastGameState<X>(origin: GameStateX<X>): GameStateX<Effect | X> {
  return ((origin: any): GameStateX<Effect | X>);
}

/**
 * GameStateXをGameStateに強制的にアップキャストする
 *
 * @typeparam {X} 発生した効果
 * @param origin キャスト元
 * @return キャスト結果
 */
export function forceUpcastGameState<X>(origin: GameStateX<X>): GameState {
  return ((origin: any): GameState);
}