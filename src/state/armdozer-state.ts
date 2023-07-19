import type { Armdozer, ArmdozerX } from "../player/armdozer";
import type { Burst } from "../player/burst";
import type { ArmdozerEffect } from "./armdozer-effect";

/**
 * アームドーザステート（型指定あり）
 * @template X バースト
 */
export type ArmdozerStateX<X> = ArmdozerX<X> & Readonly<{
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
