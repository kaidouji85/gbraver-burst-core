// @flow

import type {GameState, PlayerId} from "../..";
import type {RecoverBatterySkill} from "../../player/pilot";
import {recoverBattery} from "./recover-battery";

/**
 * パイロットスキルを発動する
 *
 * @param lastState 最新の状態
 * @param invokerId パイロットスキルを発動するプレイヤー
 * @param skill パイロットスキルの内容
 * @return 更新結果
 */
export function pilotSkill(lastState: GameState, invokerId: PlayerId): GameState {
  const donePilotSkill = pilotSkillEffect(lastState, invokerId);
  return disablePilotSkill(donePilotSkill, invokerId);
}

/**
 * パイロットスキルを適用する
 *
 * @param lastState 最新の状態
 * @param invokerId パイロットスキルを発動するプレイヤー
 * @param skill パイロットスキルの内容
 * @return 更新結果
 */
function pilotSkillEffect(lastState: GameState, invokerId: PlayerId): GameState {
  const invoker = lastState.players.find(v => v.playerId === invokerId);
  if (!invoker) {
    return lastState;
  }


  if (invoker.pilot.skill.type === 'RecoverBatterySkill') {
    const recoverBatterySkill: RecoverBatterySkill = invoker.pilot.skill;
    return recoverBattery(lastState, invokerId, recoverBatterySkill);
  }

  return lastState;
}

/**
 * パイロットスキルを使用済みにする
 *
 * @param lastState 最新状態
 * @param invokerId パイロットスキルを発動するプレイヤー
 * @return 更新結果
 */
function disablePilotSkill(lastState: GameState, invokerId: PlayerId): GameState {
  const invoker = lastState.players.find(v => v.playerId === invokerId);
  if (!invoker) {
    return lastState;
  }

  const updatedInvoker = {
    ...invoker,
    pilot: {
      ...invoker.pilot,
      enableSkill: false
    }
  };
  const updatedPlayers = lastState.players.map(v => v.playerId === invokerId
    ? updatedInvoker
    : v
  );
  return {
    ...lastState,
    players: updatedPlayers
  };
}
