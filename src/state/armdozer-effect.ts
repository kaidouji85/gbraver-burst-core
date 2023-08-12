import { z } from "zod";

/** ターン期限付きのエフェクト */
export type TurnLimitEffect = Readonly<{
  type: "TurnLimit";
  /** 効果持続ターン */
  remainingTurn: number;
}>;

/** ターン期限付きのエフェクト zodスキーマ */
export const TurnLimitEffectSchema = z.object({
  type: z.literal("TurnLimit"),
  remainingTurn: z.number(),
});

/**
 * 任意オブジェクトをTurnLimitEffectにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseTurnLimitEffect = (origin: unknown): TurnLimitEffect | null => {
  const result = TurnLimitEffectSchema.safeParse(origin);
  return result.success ? result.data : null;
}

/** 特殊な有効期限 */
export type SpecialPeriodEffect = Readonly<{
  type: "SpecialPeriod";
}>;

/** SpecialPeriodEffect zodスキーマ */
export const SpecialPeriodEffectSchema = z.object({
  type: z.literal("SpecialPeriod"),
});

/**
 * 任意オブジェクトをSpecialPeriodEffectにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseSpecialPeriodEffect = (origin: unknown): SpecialPeriodEffect | null => {
  const result = SpecialPeriodEffectSchema.safeParse(origin);
  return result.success ? result.data : null;
}

/** エフェクト有効期間 */
export type EffectPeriod = TurnLimitEffect | SpecialPeriodEffect;

/** EffectPeriod zodスキーマ */
export const EffectPeriodSchema = z.union([
  TurnLimitEffectSchema,
  SpecialPeriodEffectSchema,
]);

/**
 * 任意オブジェクトをEffectPeriodにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseEffectPeriod = (origin: unknown): EffectPeriod | null => {
  const result = EffectPeriodSchema.safeParse(origin);
  return result.success ? result.data : null;
}

/**
 * 何もしない効果
 * 全ての効果か本タイプのプロパティを持つこと
 */
export type EmptyArmdozerEffect = Readonly<{
  /** 効果判別用のプロパティ */
  type: "Empty";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** EmptyArmdozerEffect zodスキーマ */
export const EmptyArmdozerEffectSchema = z.object({
  type: z.literal("Empty"),
  period: EffectPeriodSchema,
});

/**
 * 任意オブジェクトをEmptyArmdozerEffectにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseEmptyArmdozerEffect = (origin: unknown): EmptyArmdozerEffect | null => {
  const result = EmptyArmdozerEffectSchema.safeParse(origin);
  return result.success ? result.data : null;
}

/** 攻撃力補正 */
export type CorrectPower = Readonly<{
  type: "CorrectPower";
  /** 攻撃力補正値 */
  power: number;
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** CorrectPower zodスキーマ */
export const CorrectPowerSchema = z.object({
  type: z.literal("CorrectPower"),
  power: z.number(),
  period: EffectPeriodSchema,
});

/**
 * 任意オブジェクトをCorrectPowerにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseCorrectPower = (origin: unknown): CorrectPower | null => {
  const result = CorrectPowerSchema.safeParse(origin);
  return result.success ? result.data : null;
}

/** 攻撃力補正半減 */
export type HalveCorrectPower = Readonly<{
  type: "HalveCorrectPower";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** HalveCorrectPower zodスキーマ */
export const HalveCorrectPowerSchema = z.object({
  type: z.literal("HalveCorrectPower"),
  period: EffectPeriodSchema,
});

/**
 * 任意オブジェクトをHalveCorrectPowerにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseHalveCorrectPower = (origin: unknown): HalveCorrectPower | null => {
  const result = HalveCorrectPowerSchema.safeParse(origin);
  return result.success ? result.data : null;
}

/** ダメージエフェクトの種類 */
export type ReflectDamageEffect = "Lightning";

/** ReflectDamageEffect zodスキーマ */
export const ReflectDamageEffectSchema = z.literal("Lightning");

/**
 * 任意オブジェクトをReflectDamageEffectにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseReflectDamageEffect = (origin: unknown): ReflectDamageEffect | null => {
  const result = ReflectDamageEffectSchema.safeParse(origin);
  return result.success ? result.data : null;
}

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

/** アクティブプレイヤー継続 */
export type ContinuousActivePlayer = Readonly<{
  type: "ContinuousActivePlayer";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** バッテリー補正 */
export type BatteryCorrection = Readonly<{
  type: "BatteryCorrection";
  /** バッテリー補正値 */
  batteryCorrection: number;
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** ダメージ半減 */
export type DamageHalved = Readonly<{
  type: "DamageHalved";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** ターン開始時のバッテリー回復をスキップ */
export type BatteryRecoverSkip = Readonly<{
  type: "BatteryRecoverSkip";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

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

