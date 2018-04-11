import type {PlayerId, PlayerState} from "../player/player-state";

/** ステップ単位での状態 */
export type BattleState = {
  /** プレイヤー毎の状態 */
  players: PlayerState[];
  /** 現在攻撃側のプレイヤーのIDをセットする */
  turn: PlayerId;
  /** ターンカウント */
  count: number;
}