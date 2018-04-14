// @flow
import type {ArmdozerState} from "./armdozer-state";
import {createArmdozerState} from "./armdozer-state";
import type {Player, PlayerId} from "../player/player";

/** 公開可能なプレイヤーの状態 */
export type OpenPlayerState = {
  playerId: PlayerId,
  armdozer: ArmdozerState,
};

/**
 * 公開可能なプレイヤー状態を生成する
 *
 * @param player プレイヤー情報
 * @return 生成結果
 */
export function createOpenPlayerState(player: Player): OpenPlayerState {
  return {
    playerId: player.playerId,
    armdozer: createArmdozerState(player.armdozer)
  };
}