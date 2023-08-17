import { Player } from "../../player/player";
import { createArmdozerState } from "../armdozer-state/create-armdozer-state";
import { createPilotState } from "../pilot-state/create-pilot-state";
import { PlayerState } from ".";

/**
 * プレイヤーステートを生成する
 * @param player プレイヤー情報
 * @return 生成結果
 */
export function createPlayerState(player: Player): PlayerState {
  return {
    playerId: player.playerId,
    armdozer: createArmdozerState(player.armdozer),
    pilot: createPilotState(player.pilot),
  };
}