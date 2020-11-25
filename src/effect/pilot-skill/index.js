// @flow

import type {GameState, GameStateX, PilotSkill, PilotSkillEffect, PilotSkillEffectX, PlayerId} from "../..";
import type {BuffPowerSkill, RecoverBatterySkill} from "../../player/pilot";
import {recoverBattery} from "./recover-battery";
import {buffPower} from "./buff-power";

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
    const castedSkill: RecoverBatterySkill = invoker.pilot.skill;
    const updated =  recoverBattery(lastState, invokerId, castedSkill);
    return updated ? upcastPilotSkillEffect(updated) : null;
  }

  if (invoker.pilot.skill.type === 'BuffPowerSkill') {
    const castedSkill: BuffPowerSkill = invoker.pilot.skill;
    const updated = buffPower(lastState, invokerId, castedSkill);
    return updated ? upcastPilotSkillEffect(updated) : null;
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

/**
 * パイロットスキル発動ステートにアップキャストする
 *
 * @param origin キャスト前
 * @return キャスト結果
 */
function upcastPilotSkillEffect<X: PilotSkill>(origin: GameStateX<PilotSkillEffectX<X>>): GameStateX<PilotSkillEffect> {
  return ((origin: any): GameStateX<PilotSkillEffectX<PilotSkill | typeof origin.effect.skill>>);
}
