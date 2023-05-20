import { z } from "zod";

/** パイロットスキルコマンド */
export type PilotSkillCommand = {
  type: "PILOT_SKILL_COMMAND";
};

/** パイロットスキルコマンド zodスキーマ */
export const PilotSkillCommandSchema = z.object({
  type: z.literal("PILOT_SKILL_COMMAND"),
});

/**
 * 指定したコマンドをパイロットスキルコマンドにパースする
 * @param origin パースするコマンド
 * @return パース結果、パースできない場合はnull
 */
export function parsePilotSkillCommand(
  origin: unknown
): PilotSkillCommand | null {
  const result = PilotSkillCommandSchema.safeParse(origin);
  return result.success ? result.data : null;
}
