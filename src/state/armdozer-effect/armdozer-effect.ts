import {z} from "zod";
import {EffectPeriod, EffectPeriodSchema} from "./effect-period";
import {EmptyArmdozerEffect, EmptyArmdozerEffectSchema} from "./empty-armdozer-effect";
import {CorrectPower, CorrectPowerSchema} from "./correct-power";
import {HalveCorrectPower, HalveCorrectPowerSchema} from "./halve-correct-power";
import {ReflectDamageEffect, ReflectDamageEffectSchema} from "./reflect-damage-effect";

/** ダメージ反射 */
export type TryReflect = Readonly<{
  type: "TryReflect";
  /** 反射が成功した場合のダメージ */
  damage: number;
  /** 反射のダメージエフェクト */
  effect: ReflectDamageEffect;
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** TryReflect zodスキーマ */
export const TryReflectSchema = z.object({
  type: z.literal("TryReflect"),
  damage: z.number(),
  effect: ReflectDamageEffectSchema,
  period: EffectPeriodSchema,
});

/**
 * 任意オブジェクトをTryReflectにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseTryReflect = (origin: unknown): TryReflect | null => {
  const result = TryReflectSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** アクティブプレイヤー継続 */
export type ContinuousActivePlayer = Readonly<{
  type: "ContinuousActivePlayer";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** ContinuousActivePlayer zodスキーマ */
export const ContinuousActivePlayerSchema = z.object({
  type: z.literal("ContinuousActivePlayer"),
  period: EffectPeriodSchema,
});

/**
 * 任意オブジェクトをContinuousActivePlayerにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseContinuousActivePlayer = (
  origin: unknown,
): ContinuousActivePlayer | null => {
  const result = ContinuousActivePlayerSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** バッテリー補正 */
export type BatteryCorrection = Readonly<{
  type: "BatteryCorrection";
  /** バッテリー補正値 */
  batteryCorrection: number;
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** BatteryCorrection zodスキーマ */
export const BatteryCorrectionSchema = z.object({
  type: z.literal("BatteryCorrection"),
  batteryCorrection: z.number(),
  period: EffectPeriodSchema,
});

/**
 * 任意オブジェクトをBatteryCorrectionにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBatteryCorrection = (
  origin: unknown,
): BatteryCorrection | null => {
  const result = BatteryCorrectionSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** ダメージ半減 */
export type DamageHalved = Readonly<{
  type: "DamageHalved";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** DamageHalved zodスキーマ */
export const DamageHalvedSchema = z.object({
  type: z.literal("DamageHalved"),
  period: EffectPeriodSchema,
});

/**
 * 任意オブジェクトをDamageHalvedにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseDamageHalved = (origin: unknown): DamageHalved | null => {
  const result = DamageHalvedSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** ターン開始時のバッテリー回復をスキップ */
export type BatteryRecoverSkip = Readonly<{
  type: "BatteryRecoverSkip";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** BatteryRecoverSkip zodスキーマ */
export const BatteryRecoverSkipSchema = z.object({
  type: z.literal("BatteryRecoverSkip"),
  period: EffectPeriodSchema,
});

/**
 * 任意オブジェクトをBatteryRecoverSkipにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBatteryRecoverSkip = (
  origin: unknown,
): BatteryRecoverSkip | null => {
  const result = BatteryRecoverSkipSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/**
 * アームドーザに適用される効果
 * バフ、デバフなどのターン継続効果を想定している
 */
export type ArmdozerEffect =
  | EmptyArmdozerEffect
  | CorrectPower
  | HalveCorrectPower
  | TryReflect
  | ContinuousActivePlayer
  | BatteryCorrection
  | DamageHalved
  | BatteryRecoverSkip;

/** ArmdozerEffect zodスキーマ */
export const ArmdozerEffectSchema = z.union([
  EmptyArmdozerEffectSchema,
  CorrectPowerSchema,
  HalveCorrectPowerSchema,
  TryReflectSchema,
  ContinuousActivePlayerSchema,
  BatteryCorrectionSchema,
  DamageHalvedSchema,
  BatteryRecoverSkipSchema,
]);

/**
 * 任意オブジェクトをArmdozerEffectにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseArmdozerEffect = (origin: unknown): ArmdozerEffect | null => {
  const result = ArmdozerEffectSchema.safeParse(origin);
  return result.success ? result.data : null;
};
