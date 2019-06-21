// @flow
import type {ArmdozerState} from "./armdozer/armdozer-state";
import {createArmdozerState} from "./armdozer/armdozer-state";
import type {Player, PlayerId} from "../player/player";

/** 公開可能なプレイヤーの状態 */
export type PlayerState = {
  playerId: PlayerId,
  armdozer: ArmdozerState,
};

/**
 * 公開可能なプレイヤー状態を生成する
 *
 * @param player プレイヤー情報
 * @return 生成結果
 */
export function createOpenPlayerState(player: Player): PlayerState {
  return {
    playerId: player.playerId,
    armdozer: createArmdozerState(player.armdozer)
  };
}
