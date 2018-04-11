import type {Armdozer} from "./armdozer";

/** 戦闘時のアームドーザ状態 */
export type ArmdozerGameState = Armdozer & {
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
export function createArmdozerGameState(basic: Armdozer): ArmdozerGameState {
  return {...basic, hp: basic.maxHp, battery: basic.maxBattery};
}