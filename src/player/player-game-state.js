// @flow
import type {ArmdozerGameState} from "../armdozer/armdozer-game-state";
import type {PlayerId} from "./player";

/** プレイヤーID */

/** プレイヤーのゲーム状態 */
export type PlayerGameState = {
  playerId: PlayerId;
  armDozer: ArmdozerGameState;
};