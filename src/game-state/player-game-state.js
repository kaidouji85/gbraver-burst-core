// @flow
import type {ArmdozerGameState} from "./armdozer-game-state";
import type {PlayerId} from "../player/player";

/** プレイヤーのゲーム状態 */
export type PlayerGameState = {
  playerId: PlayerId,
  armDozer: ArmdozerGameState,
};
