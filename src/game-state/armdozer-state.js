import type {Armdozer} from "../armdozer/armdozer";

/** アームドーザの状態 */
export type ArmdozerState = Armdozer & {
  /** 現在のHP */
  hp: number;
  /** 現在のバッテリー */
  battery: number;
};

/**
 * アームドーザ基本ステータスから戦闘状態を生成する
 *
 * @param basic 基本ステータス
 * @return 戦闘状態
 */
export function createArmdozerState(basic: Armdozer): ArmdozerState {
  return {...basic, hp: basic.maxHp, battery: basic.maxBattery};
}