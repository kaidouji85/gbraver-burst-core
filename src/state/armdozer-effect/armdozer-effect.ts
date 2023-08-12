import {z} from "zod";
import {EffectPeriod, EffectPeriodSchema} from "./effect-period";
import {EmptyArmdozerEffect, EmptyArmdozerEffectSchema} from "./empty-armdozer-effect";
import {CorrectPower, CorrectPowerSchema} from "./correct-power";
import {HalveCorrectPower, HalveCorrectPowerSchema} from "./halve-correct-power";
import {TryReflect, TryReflectSchema} from "./try-reflect";
import {ContinuousActivePlayer, ContinuousActivePlayerSchema} from "./continuous-active-player";
import {BatteryCorrection, BatteryCorrectionSchema} from "./battery-correction";
import {DamageHalved, DamageHalvedSchema} from "./damage-halved";

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
