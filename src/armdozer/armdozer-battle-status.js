import type {ArmdozerStatus} from "./armdozer-status";

/** 戦闘時のアームドーザ状態 */
export type ArmDozerBattleStatus = ArmdozerStatus & {
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
export function createArmDozerBattleStatus(basic: ArmdozerStatus): ArmDozerBattleStatus {
  return {...basic, hp: basic.maxHp, battery: basic.maxBattery};
}