// @flow
import type {OpenPlayerState} from "./open-player-state";
import type {PlayerId} from "../player/player";
import type {PhaseName} from "../phase/phase-name";

/** 全プレイヤーに公開可能なゲーム状態 */
export type OpenGameState = {
  /** プレイヤー毎の状態 */
  players: OpenPlayerState[],
  /** 攻撃側のプレイヤーのID */
  activePlayerId: PlayerId,
  /** フェイズ名 */
  phase: PhaseName,
};
