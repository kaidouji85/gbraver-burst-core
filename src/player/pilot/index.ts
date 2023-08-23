import { z } from "zod";

import { PilotSkill, PilotSkillSchema } from "./pilot-skill";

/** パイロットID */
export type PilotId = string;

/** PilotId zodスキーマ */
export const PilotIdSchema = z.string();

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
