import type {PlayerGameState} from "../player/player-game-state";
import type {PlayerId} from "../player/player";
import type {PhaseName} from "./phase-name";

/** ゲームの状態 */
export type GameState = {
  /** プレイヤー毎の状態 */
  players: PlayerGameState[],
  /** 攻撃側のプレイヤーのID */
  activePlayerId: PlayerId,
  /** フェイズ名 */
  phase: PhaseName,
};