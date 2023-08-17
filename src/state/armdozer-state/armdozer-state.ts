import { z } from "zod";

import { Armdozer, ArmdozerSchema, ArmdozerX } from "../../player/armdozer";
import { Burst } from "../../player/burst";
import { ArmdozerEffect, ArmdozerEffectSchema } from "../armdozer-effect";

/**
 * アームドーザステート（型指定あり）
 * @template X バースト
 */
export type ArmdozerStateX<X> = ArmdozerX<X> &
  Readonly<{
    /** 現在のHP */
    hp: number;
    /** 現在のバッテリー */
    battery: number;
    /** バーストが使えるか否か、trueで使える */
    enableBurst: boolean;
    /** 現在有効な各種効果 */
    effects: ArmdozerEffect[];
  }>;

/** アームドーザステート */
export type ArmdozerState = ArmdozerStateX<Burst>;

/** ArmdozerState zodスキーマ */
export const ArmdozerStateSchema = ArmdozerSchema.extend({
  hp: z.number(),
  battery: z.number(),
  enableBurst: z.boolean(),
  effects: z.array(ArmdozerEffectSchema),
});

/**
 * 任意オブジェクトをArmdozerStateにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseArmDozerState = (origin: unknown): ArmdozerState | null => {
  const result = ArmdozerStateSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/**
 * アームドーザ基本ステータスから戦闘状態を生成する
 * @param basic 基本ステータス
 * @return 戦闘状態
 */
export function createArmdozerState(basic: Armdozer): ArmdozerState {
  return {
    ...basic,
    hp: basic.maxHp,
    battery: basic.maxBattery,
    enableBurst: true,
    effects: [],
  };
}
