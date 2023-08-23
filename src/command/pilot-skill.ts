import { z } from "zod";

/** パイロットスキルコマンド */
export type PilotSkillCommand = Readonly<{
  type: "PILOT_SKILL_COMMAND";
}>;

/** パイロットスキルコマンド zodスキーマ */
export const PilotSkillCommandSchema = z.object({
  type: z.literal("PILOT_SKILL_COMMAND"),
});
