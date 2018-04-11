// @flow
import type {ArmDozerBattleStatus} from "../armdozer/armdozer-battle-status";

/** プレイヤーID */
export type PlayerId = string;

/** プレイヤーのゲーム状態 */
export type PlayerState = {
  playerId: PlayerId;
  armDozer: ArmDozerBattleStatus;
};