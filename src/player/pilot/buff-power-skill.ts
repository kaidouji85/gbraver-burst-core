import { z } from "zod";

/** パイロットスキル 攻撃バフ */
export type BuffPowerSkill = Readonly<{
  type: "BuffPowerSkill";
  /** 攻撃力アップ */
  buffPower: number;
  /** バフ継続ターン数 */
  duration: number;
}>;

/** BuffPowerSkill zodスキーマ */
export const BuffPowerSkillSchema = z.object({
  type: z.literal("BuffPowerSkill"),
  buffPower: z.number(),
  duration: z.number(),
});
