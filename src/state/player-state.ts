import { Burst } from "../player/burst";
import { PilotSkill } from "../player/pilot/pilot-skill";
import { Player, PlayerId } from "../player/player";
import { ArmdozerStateX } from "./armdozer-state";
import { createArmdozerState } from "./armdozer-state/create-armdozer-state";
import { createPilotState } from "./pilot-state/create-pilot-state";
import { PilotStateX } from "./pilot-state";

/**
 * プレイヤーステート（型指定あり）
 * @template BURST バースト
 * @template PILOT パイロットスキル
 */
export type PlayerStateX<BURST, PILOT> = Readonly<{
  playerId: PlayerId;
  armdozer: ArmdozerStateX<BURST>;
  pilot: PilotStateX<PILOT>;
}>;

/** プレイヤーステート */
export type PlayerState = PlayerStateX<Burst, PilotSkill>;

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

/**
 * プレイヤーの死亡判定を行う
 * @param defender 防御側のステータス
 * @return 判定結果、trueで死亡
 */
export function isPlayerDeath(defender: PlayerState): boolean {
  return defender.armdozer.hp <= 0;
}
