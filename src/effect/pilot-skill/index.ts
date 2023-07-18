import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import { PlayerState } from "../../state/player-state";
import { batteryBoost } from "./battery-boost";
import { batteryEnchantment } from "./battery-enchantment";
import { buffPower } from "./buff-power";
import { damageHalvedSkill } from "./damage-halved-skill";
import type { PilotSkillEffect } from "./pilot-skill-effect";
import { recoverBattery } from "./recover-battery";

/**
 * パイロットスキルを適用する
 * @param lastState 最新の状態
 * @param invokerId パイロットスキルを発動するプレイヤー
 * @return 更新結果、実行不可能な場合は例外を返す
 */
function pilotSkillEffect(
  lastState: GameState,
  invokerId: PlayerId,
): GameStateX<PilotSkillEffect> {
  const invoker = lastState.players.find((v) => v.playerId === invokerId);
  if (!invoker) {
    throw new Error("not found pilot skill invoker");
  }

  if (invoker.pilot.skill.type === "RecoverBatterySkill") {
    return recoverBattery(lastState, invokerId, invoker.pilot.skill);
  }

  if (invoker.pilot.skill.type === "BuffPowerSkill") {
    return buffPower(lastState, invokerId, invoker.pilot.skill);
  }

  if (invoker.pilot.skill.type === "BatteryEnchantmentSkill") {
    return batteryEnchantment(lastState, invokerId, invoker.pilot.skill);
  }

  if (invoker.pilot.skill.type === "DamageHalvedSkill") {
    return damageHalvedSkill(lastState, invokerId, invoker.pilot.skill);
  }

  if (invoker.pilot.skill.type === "BatteryBoostSkill") {
    return batteryBoost(lastState, invokerId, invoker.pilot.skill);
  }

  throw new Error("not found pilot skill");
}

/**
 * パイロットスキルを使用済みにする
 * @param lastState 最新状態
 * @return 更新結果
 */
function disablePilotSkill(
  lastState: GameStateX<PilotSkillEffect>,
): GameStateX<PilotSkillEffect> {
  const updateInvoker = (invoker: PlayerState) => ({
    ...invoker,
    pilot: { ...invoker.pilot, enableSkill: false },
  });
  const updatedPlayers = lastState.players.map((v) =>
    v.playerId === lastState.effect.invokerId ? updateInvoker(v) : v,
  );
  return { ...lastState, players: updatedPlayers };
}

/**
 * パイロットスキルを発動する
 * @param lastState 最新の状態
 * @param invokerId パイロットスキルを発動するプレイヤー
 * @return 更新結果、実行不可能な場合は例外を返す
 */
export function pilotSkill(
  lastState: GameState,
  invokerId: PlayerId,
): GameStateX<PilotSkillEffect> {
  const donePilotSkill = pilotSkillEffect(lastState, invokerId);
  return disablePilotSkill(donePilotSkill);
}
