import { Armdozer } from "../../player/armdozer";
import { ArmdozerState } from ".";

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
