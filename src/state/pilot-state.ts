import type { Pilot, PilotSkill, PilotX } from "../player/pilot";

/**
 * パイロットステート
 *
 * @type Skill パイロットスキル
 */
export type PilotStateX<SKILL> = PilotX<SKILL> & {
  /**
   * パイロットスキルが発動可能かいなかのフラグ、trueで発動可能
   */
  enableSkill: boolean;
};

/**
 * パイロットステート
 */
export type PilotState = PilotStateX<PilotSkill>;

/**
 * パイロットステートを生成する
 *
 * @param origin パイロット情報
 * @return 生成結果
 */
export function createPilotState(origin: Pilot): PilotState {
  return { ...origin, enableSkill: true };
}
