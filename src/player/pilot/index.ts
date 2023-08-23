import { z } from "zod";

import { PilotSkill, PilotSkillSchema } from "./pilot-skill";

/** パイロットID */
export type PilotId = string;

/** PilotId zodスキーマ */
export const PilotIdSchema = z.string();

/**
 * 任意オブジェクトをPilotIdにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parsePilotId = (origin: unknown): PilotId | null => {
  const result = PilotIdSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/**
 * パイロット
 * @template X パイロットスキル
 */
export type PilotX<X> = Readonly<{
  /** ID */
  id: PilotId;
  /** パイロット名 */
  name: string;
  /** スキル */
  skill: X;
}>;

/** パイロット */
export type Pilot = PilotX<PilotSkill>;

/** Pilot zodスキーマ */
export const PilotSchema = z.object({
  id: PilotIdSchema,
  name: z.string(),
  skill: PilotSkillSchema,
});
