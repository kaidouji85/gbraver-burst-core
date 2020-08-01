// @flow

import type {GameState, PlayerId} from "../..";
import type {PilotSkill, RecoverBatterySkill} from "../../player/pilot";
import {recoverBattery} from "./recover-battery";

/**
 * パイロットスキルを発動する
 *
 * @param lastState 最新の状態
 * @param invokerId パイロットスキルを発動するプレイヤー
 * @param skill パイロットスキルの内容
 * @return 更新結果
 */
export function pilotSkill(lastState: GameState, invokerId: PlayerId, skill: PilotSkill): GameState {
  if (skill.type === 'RecoverBatterySkill') {
    const recoverBatterySkill: RecoverBatterySkill = skill;
    return recoverBattery(lastState, invokerId, recoverBatterySkill);
  }

  return lastState;
}
