import {z} from "zod";
import {BurstRecoverBattery, BurstRecoverBatterySchema} from "./burst-recover-battery";
import {RecoverBattery, RecoverBatterySchema} from "./recover-battery";

/** 攻撃力バフ */
export type BuffPower = BurstRecoverBattery &
  Readonly<{
    type: "BuffPower";
    /** 攻撃力アップ */
    buffPower: number;
    /** バフ継続ターン数 */
    duration: number;
  }>;

/** BuffPower zodスキーマ */
export const BuffPowerSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("BuffPower"),
  buffPower: z.number(),
  duration: z.number(),
});

/**
 * 任意オブジェクトをBuffPowerにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBuffPower = (origin: unknown): BuffPower | null => {
  const result = BuffPowerSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** 電撃バリア */
export type LightningBarrier = BurstRecoverBattery &
  Readonly<{
    type: "LightningBarrier";
    /** 電撃ダメージ */
    damage: number;
    /** バリア継続ターン数 */
    duration: number;
  }>;

/** LightningBarrier zodスキーマ */
export const LightningBarrierSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("LightningBarrier"),
  damage: z.number(),
  duration: z.number(),
});

/**
 * 任意オブジェクトをLightningBarrierにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseLightningBarrier = (
  origin: unknown,
): LightningBarrier | null => {
  const result = LightningBarrierSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** 連続攻撃 */
export type ContinuousAttack = BurstRecoverBattery &
  Readonly<{
    type: "ContinuousAttack";
  }>;

/** ContinuousAttack zodスキーマ */
export const ContinuousAttackSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("ContinuousAttack"),
});

/**
 * 任意オブジェクトをContinuousAttackにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseContinuousAttack = (
  origin: unknown,
): ContinuousAttack | null => {
  const result = ContinuousAttackSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** バッテリーリミットブレイク */
export type BatteryLimitBreak = BurstRecoverBattery &
  Readonly<{
    type: "BatteryLimitBreak";
    /** バースト後の最大バッテリー */
    maxBattery: number;
  }>;

/** BatteryLimitBreak zodスキーマ */
export const BatteryLimitBreakSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("BatteryLimitBreak"),
  maxBattery: z.number(),
});

/**
 * 任意オブジェクトをBatteryLimitBreakにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBatteryLimitBreak = (
  origin: unknown,
): BatteryLimitBreak | null => {
  const result = BatteryLimitBreakSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** バースト */
export type Burst =
  | RecoverBattery
  | BuffPower
  | LightningBarrier
  | ContinuousAttack
  | BatteryLimitBreak;

/** Burst zodスキーマ */
export const BurstSchema = z.union([
  RecoverBatterySchema,
  BuffPowerSchema,
  LightningBarrierSchema,
  ContinuousAttackSchema,
  BatteryLimitBreakSchema,
]);

/**
 * 任意オブジェクトをBurstにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBurst = (origin: unknown): Burst | null => {
  const result = BurstSchema.safeParse(origin);
  return result.success ? result.data : null;
};
