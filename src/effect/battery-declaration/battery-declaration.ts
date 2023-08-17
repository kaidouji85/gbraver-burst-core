import { z } from "zod";

import { PlayerId,PlayerIdSchema } from "../../player/player";

/** 攻撃、防御側のバッテリー宣言 */
export type BatteryDeclaration = Readonly<{
  name: "BatteryDeclaration";
  /** 攻撃側プレイヤー */
  attacker: PlayerId;
  /** 攻撃側バッテリー */
  attackerBattery: number;
  /** 本来の攻撃側バッテリー */
  originalBatteryOfAttacker: number;
  /** 防御側バッテリー */
  defenderBattery: number;
  /** 本来の防御側バッテリー */
  originalBatteryOfDefender: number;
}>;

/** BatteryDeclaration zodスキーマ */
export const BatteryDeclarationSchema = z.object({
  name: z.literal("BatteryDeclaration"),
  attacker: PlayerIdSchema,
  attackerBattery: z.number(),
  originalBatteryOfAttacker: z.number(),
  defenderBattery: z.number(),
  originalBatteryOfDefender: z.number(),
});

/**
 * 任意オブジェクトをBatteryDeclarationにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBatteryDeclaration = (origin: unknown): BatteryDeclaration | null => {
  const result = BatteryDeclarationSchema.safeParse(origin);
  return result.success ? result.data : null;
};