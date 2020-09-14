// @flow

import type {GameState, GameStateX, PilotSkillEffect, PlayerId} from "../..";
import type {RecoverBatterySkill} from "../../player/pilot";
import {recoverBattery} from "./recover-battery";

/**
 * パイロットスキルを発動する
 *
 * @param lastState 最新の状態
 * @param invokerId パイロットスキルを発動するプレイヤー
 * @return 更新結果、実行不可能な場合はnullを返す
 */
export function pilotSkill(lastState: GameState, invokerId: PlayerId): ?GameStateX<PilotSkillEffect> {
  const donePilotSkill = pilotSkillEffect(lastState, invokerId);
  if (!donePilotSkill) {
    return null;
  }
  return disablePilotSkill(donePilotSkill);
}

/**
 * パイロットスキルを適用する
 *
 * @param lastState 最新の状態
 * @param invokerId パイロットスキルを発動するプレイヤー
 * @return 更新結果、実行不可能な場合はnullを返す
 */
function pilotSkillEffect(lastState: GameState, invokerId: PlayerId): ?GameStateX<PilotSkillEffect> {
  const invoker = lastState.players.find(v => v.playerId === invokerId);
  if (!invoker) {
    return null;
  }


  if (invoker.pilot.skill.type === 'RecoverBatterySkill') {
    const recoverBatterySkill: RecoverBatterySkill = invoker.pilot.skill;
    return recoverBattery(lastState, invokerId, recoverBatterySkill);
  }

  return null;
}

/**
 * パイロットスキルを使用済みにする
 *
 * @param lastState 最新状態
 * @return 更新結果、実行不可能な場合はnullを返す
 */
function disablePilotSkill(lastState: GameStateX<PilotSkillEffect>): ?GameStateX<PilotSkillEffect> {
  const invoker = lastState.players.find(v => v.playerId === lastState.effect.invokerId);
  if (!invoker) {
    return null;
  }

  const updatedInvoker = {
    ...invoker,
    pilot: {
      ...invoker.pilot,
      enableSkill: false
    }
  };
  const updatedPlayers = lastState.players
    .map(v => v.playerId === updatedInvoker.playerId ? updatedInvoker : v);
  return {
    ...lastState,
    players: updatedPlayers
  };
}
