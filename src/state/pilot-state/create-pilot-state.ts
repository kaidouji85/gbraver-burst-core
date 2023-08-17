import { Pilot } from "../../player/pilot";
import { PilotState } from ".";

/**
 * パイロットステートを生成する
 * @param origin パイロット情報
 * @return 生成結果
 */
export function createPilotState(origin: Pilot): PilotState {
  return { ...origin, enableSkill: true };
}
