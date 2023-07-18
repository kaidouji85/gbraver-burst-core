import type { RecoverBatterySkill } from "../../player/pilot";
import type { PlayerId } from "../../player/player";
import type { ArmdozerState } from "../../state/armdozer-state";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { PilotSkillEffectX } from "./pilot-skill-effect";

/**
 * 回復後のバッテリーを計算する
 *
 * @param armdozer アームドーザステート
 * @param skill スキル内容
 * @return 回復後のバッテリー
 */
export function calcRecoverBattery(
  armdozer: ArmdozerState,
  skill: RecoverBatterySkill,
): number {
  return Math.min(armdozer.battery + skill.recoverBattery, armdozer.maxBattery);
}

/**
 * バッテリー回復スキルを発動する
 * @param invoker スキル発動者
 * @param skill スキル内容
 * @return 発動後のステート
 */
function invokeRecoverBattery(
  invoker: PlayerState,
  skill: RecoverBatterySkill
): PlayerState {
  return {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      battery: calcRecoverBattery(invoker.armdozer, skill),
    },
  }
}

/**
 * パイロットスキル バッテリー回復を発動する
 * @param lastState 最新のゲーム状態
 * @param invokerId 発動するプレイヤー
 * @param skill スキル内容
 * @return 更新結果、実行不可能な場合は例外を投げる
 */
export function recoverBattery(
  lastState: GameState,
  invokerId: PlayerId,
  skill: RecoverBatterySkill,
): GameStateX<PilotSkillEffectX<RecoverBatterySkill>> {
  const players: PlayerState[] = lastState.players.map((v) =>
    v.playerId === invokerId ? invokeRecoverBattery(v, skill) : v,
  );
  const effect: PilotSkillEffectX<RecoverBatterySkill> = {
    name: "PilotSkillEffect",
    invokerId: invokerId,
    skill,
  };
  return { ...lastState, players, effect: effect };
}
