import { z } from "zod";

import {
  BatteryCorrection,
  BatteryCorrectionSchema,
} from "./battery-correction";
import {
  BatteryRecoverSkip,
  BatteryRecoverSkipSchema,
} from "./battery-recover-skip";
import {
  ContinuousActivePlayer,
  ContinuousActivePlayerSchema,
} from "./continuous-active-player";
import { CorrectPower, CorrectPowerSchema } from "./correct-power";
import { DamageHalved, DamageHalvedSchema } from "./damage-halved";
import {
  EmptyArmdozerEffect,
  EmptyArmdozerEffectSchema,
} from "./empty-armdozer-effect";
import {
  HalveCorrectPower,
  HalveCorrectPowerSchema,
} from "./halve-correct-power";
import { TryReflect, TryReflectSchema } from "./try-reflect";

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
