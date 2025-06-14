import { z } from "zod";

import { Burst, BurstSchema } from "./burst";

/** アームドーザID */
export type ArmdozerId = string;

/** ArmdozerId zodスキーマ */
export const ArmdozerIdSchema = z.string();

/**
 * アームドーザ基本情報（型指定あり）
 * @template X バースト
 */
export type ArmdozerX<X> = Readonly<{
  /** アームドーザID */
  id: ArmdozerId;
  /** 名前 */
  name: string;
  /** 最大HP */
  maxHp: number;
  /** 最大バッテリー */
  maxBattery: number;
  /** バッテリー自動回復量 */
  batteryAutoRecovery: number;
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
  id: ArmdozerIdSchema,
  name: z.string(),
  maxHp: z.number(),
  maxBattery: z.number(),
  batteryAutoRecovery: z.number(),
  power: z.number(),
  speed: z.number(),
  burst: BurstSchema,
});
