import { Burst } from "../../player/burst";
import { PilotSkill } from "../../player/pilot/pilot-skill";
import { PlayerId } from "../../player/player";
import { ArmdozerStateX } from "../armdozer-state";
import { PilotStateX } from "../pilot-state";

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
