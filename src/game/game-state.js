import type {PlayerId, PlayerState} from "../player/player-state";

/** ステップ単位での状態 */
export type BattleState = {
  /** プレイヤー毎の状態 */
  players: PlayerState[],
  /** 攻撃側のプレイヤーのID */
  activePlayer: PlayerId
}