import { z } from "zod";

import { PilotSchema, PilotX } from "../../player/pilot";
import { PilotSkill } from "../../player/pilot/pilot-skill";

/**
 * パイロットステート（型指定あり）
 * @template Skill パイロットスキル
 */
export type PilotStateX<SKILL> = PilotX<SKILL> &
  Readonly<{
    /** パイロットスキルが発動可能かいなかのフラグ、trueで発動可能 */
    enableSkill: boolean;
  }>;

/** パイロットステート */
export type PilotState = PilotStateX<PilotSkill>;

/** PilotState zodスキーマ */
export const PilotStateSchema = PilotSchema.extend({
  enableSkill: z.boolean(),
});

/**
 * 任意オブジェクトをPilotStateにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parsePilotState = (origin: unknown): PilotState | null => {
  const result = PilotStateSchema.safeParse(origin);
  return result.success ? result.data : null;
};
