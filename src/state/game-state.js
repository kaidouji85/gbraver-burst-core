// @flow
import type {PlayerState} from "./player-state";
import type {PlayerId} from "../player/player";
import type {Effect} from "../effect";

/** ゲーム状態 */
export type GameState = {
  /** プレイヤー毎の状態 */
  players: PlayerState[],
  /** 攻撃側のプレイヤーのID */
  activePlayerId: PlayerId,
  /** このステップで発生した効果 */
  effect: Effect,
};
