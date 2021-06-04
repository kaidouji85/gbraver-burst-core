// @flow

import type {
  BatteryEnchantmentSkill,
  BuffPowerSkill,
  DamageDecreaseSkill,
  PilotSkill,
  RecoverBatterySkill
} from "../../player/pilot";
import {recoverBattery} from "./recover-battery";
import {buffPower} from "./buff-power";
import {damageDecrease} from "./damage-decrease";
import type {GameState, GameStateX} from "../../state/game-state";
import type {PlayerId} from "../../player/player";
import type {PilotSkillEffect, PilotSkillEffectX} from "./pilot-skill-effect";
import {batteryEnchantment} from "./battery-enchantment";

/**
 * パイロットスキルを発動する
 *
 * @param lastState 最新の状態
 * @param invokerId パイロットスキルを発動するプレイヤー
 * @return 更新結果、実行不可能な場合はnullを返す
 */
export function pilotSkill(lastState: GameState, invokerId: PlayerId): GameStateX<PilotSkillEffect> {
  const donePilotSkill = pilotSkillEffect(lastState, invokerId);
  return disablePilotSkill(donePilotSkill);
}

/**
 * パイロットスキルを適用する
 *
 * @param lastState 最新の状態
 * @param invokerId パイロットスキルを発動するプレイヤー
 * @return 更新結果、実行不可能な場合はnullを返す
 */
function pilotSkillEffect(lastState: GameState, invokerId: PlayerId): GameStateX<PilotSkillEffect> {
  const invoker = lastState.players.find(v => v.playerId === invokerId);
  if (!invoker) {
    throw new Error('not found pilot skill invoker');
  }

  if (invoker.pilot.skill.type === 'RecoverBatterySkill') {
    const castedSkill: RecoverBatterySkill = invoker.pilot.skill;
    return up(recoverBattery(lastState, invokerId, castedSkill));
  }

  if (invoker.pilot.skill.type === 'BuffPowerSkill') {
    const castedSkill: BuffPowerSkill = invoker.pilot.skill;
    return up(buffPower(lastState, invokerId, castedSkill));
  }

  if (invoker.pilot.skill.type === 'DamageDecreaseSkill') {
    const castedSkill: DamageDecreaseSkill = invoker.pilot.skill;
    return up(damageDecrease(lastState, invokerId, castedSkill));
  }

  if (invoker.pilot.skill.type === 'BatteryEnchantmentSkill') {
    const castedSkill: BatteryEnchantmentSkill = invoker.pilot.skill;
    return up(batteryEnchantment(lastState, invokerId, castedSkill));
  }

  throw new Error('not found pilot skill');
}

/**
 * パイロットスキルを使用済みにする
 *
 * @param lastState 最新状態
 * @return 更新結果、実行不可能な場合はnullを返す
 */
function disablePilotSkill(lastState: GameStateX<PilotSkillEffect>): GameStateX<PilotSkillEffect> {
  const invoker = lastState.players.find(v => v.playerId === lastState.effect.invokerId);
  if (!invoker) {
    throw new Error('not found pilot skill invoker');
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
function up<X: PilotSkill>(origin: GameStateX<PilotSkillEffectX<X>>): GameStateX<PilotSkillEffect> {
  return ((origin: any): GameStateX<PilotSkillEffectX<PilotSkill | typeof origin.effect.skill>>);
}
