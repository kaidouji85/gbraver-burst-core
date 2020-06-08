// @flow
import type {PlayerState} from "./player-state";
import type {PlayerId} from "../../player/player";
import type {Effect} from "../../effect";

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
