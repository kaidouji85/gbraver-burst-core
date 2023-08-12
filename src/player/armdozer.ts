import { z } from "zod";

import { Burst, BurstSchema } from "./burst";

/** アームドーザID */
export type ArmDozerId = string;

/** ArmDozerId zodスキーマ */
export const ArmDozerIdSchema = z.string();

/**
 * 任意オブジェクトをArmDozerIdにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseArmDozerId = (origin: unknown): ArmDozerId | null => {
  const result = ArmDozerIdSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/**
 * アームドーザ基本情報（型指定あり）
 * @template X バースト
 */
export type ArmdozerX<X> = Readonly<{
  /** アームドーザID */
  id: ArmDozerId;
  /** 名前 */
  name: string;
  /** 最大HP */
  maxHp: number;
  /** 最大バッテリー */
  maxBattery: number;
  /** 攻撃 */
  power: number;
  /** スピード */
  speed: number;
  /** バースト */
  burst: X;
}>;

/** アームドーザ基本情報 */
export type Armdozer = ArmdozerX<Burst>;

/** Armdozer zodスキーマ */
export const ArmdozerSchema = z.object({
  id: ArmDozerIdSchema,
  name: z.string(),
  maxHp: z.number(),
  maxBattery: z.number(),
  power: z.number(),
  speed: z.number(),
  burst: BurstSchema,
});

/**
 * 任意オブジェクトをArmdozerにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseArmdozer = (origin: unknown): Armdozer | null => {
  const result = ArmdozerSchema.safeParse(origin);
  return result.success ? result.data : null;
};
