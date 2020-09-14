// @flow

import type {ArmdozerState, GameState, GameStateX, PilotSkillEffect, PlayerId, PlayerState} from "../..";
import type {RecoverBatterySkill} from "../../player/pilot";

/**
 * パイロットスキル バッテリー回復を発動する
 *
 * @param lastState 最新のゲーム状態
 * @param invokerId 発動するプレイヤー
 * @param skill スキル内容
 * @return 更新結果、実行不可能な場合はnullを返す
 */
export function recoverBattery(lastState: GameState, invokerId: PlayerId, skill: RecoverBatterySkill): ?GameStateX<PilotSkillEffect> {
  const invoker = lastState.players.find(v => v.playerId === invokerId);
  if (!invoker) {
    return null;
  }

  const updatedInvoker: PlayerState = {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      battery: calcRecoverBattery(invoker.armdozer, skill)
    }
  };
  const updatedPlayers: PlayerState[] = lastState.players
    .map(v => v.playerId === invokerId ? updatedInvoker : v);
  const effect = {
    name: 'PilotSkillEffect',
    invokerId: invokerId,
    skill: skill,
  };
  return {
    ...lastState,
    players: updatedPlayers,
    effect: effect
  };
}

/**
 * 回復後のバッテリーを計算する
 *
 * @param armdozer アームドーザステート
 * @param skill スキル内容
 * @return 回復後のバッテリー
 */
export function calcRecoverBattery(armdozer: ArmdozerState, skill: RecoverBatterySkill): number {
  return Math.min(armdozer.battery + skill.recoverBattery, armdozer.maxBattery);
}
