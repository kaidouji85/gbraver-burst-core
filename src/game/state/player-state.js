// @flow
import type {ArmdozerStateX} from "./armdozer-state";
import {createArmdozerState} from "./armdozer-state";
import type {Player, PlayerId} from "../../player/player";
import type {Burst} from "../../player/burst";
import type {PilotStateX} from "./pilot-state";
import {createPilotState} from "./pilot-state";
import type {PilotSkill} from "../../player/pilot";

/**
 * プレイヤーの状態
 *
 * @type BURST バースト
 * @type PILOT パイロットスキル
 */
export type PlayerStateX<BURST, PILOT> = {
  playerId: PlayerId,
  armdozer: ArmdozerStateX<BURST>,
  pilot: PilotStateX<PILOT>,
};

/** プレイヤーの状態 */
export type PlayerState = PlayerStateX<Burst, PilotSkill>;

/**
 * 公開可能なプレイヤー状態を生成する
 *
 * @param player プレイヤー情報
 * @return 生成結果
 */
export function createOpenPlayerState(player: Player): PlayerState {
  return {
    playerId: player.playerId,
    armdozer: createArmdozerState(player.armdozer),
    pilot: createPilotState(player.pilot),
  };
}

/**
 * プレイヤーの死亡判定を行う
 *
 * @param defender 防御側のステータス
 * @return 判定結果、trueで死亡
 */
export function isPlayerDeath(defender: PlayerState): boolean {
  return defender.armdozer.hp <= 0;
}