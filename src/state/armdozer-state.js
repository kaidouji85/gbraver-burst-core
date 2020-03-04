// @flow

import type {Armdozer, ArmdozerX} from "../player/armdozer/armdozer";
import type {ArmdozerEffect} from "./armdozer-effect";
import type {Burst} from "../player/armdozer/burst";

/**
 * アームドーザ状態
 *
 * @typeparam {X} バースト
 */
export type ArmdozerStateX<X> = ArmdozerX<X> & {
  /** 現在のHP */
  hp: number,
  /** 現在のバッテリー */
  battery: number,
  /** バーストが使えるか否か、trueで使える */
  enableBurst: boolean,
  /** 現在有効な各種効果 */
  effects: ArmdozerEffect[],
};

/** アームドーザの状態 */
export type ArmdozerState = ArmdozerStateX<Burst>;

/**
 * アームドーザ基本ステータスから戦闘状態を生成する
 *
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
