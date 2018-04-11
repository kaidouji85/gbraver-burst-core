import type {PlayerGameState} from "../../player/player-game-state";
import type {PlayerId} from "../../player/player";

/** ゲームの状態 */
export type GameState = {
  /** プレイヤー毎の状態 */
  players: PlayerGameState[],
  /** 攻撃側のプレイヤーのID */
  activePlayerId: PlayerId
}