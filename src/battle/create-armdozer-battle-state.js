// @flow
import type {ArmDozerBasicStatus, ArmDozerBattleStatus} from '../flow-type';

/**
 * アームドーザ基本ステータスから戦闘状態を生成する
 *
 * @param basic 基本ステータス
 * @return 戦闘状態
 */
export function createArmDozerBattleState(basic: ArmDozerBasicStatus): ArmDozerBattleStatus {
  return {...basic, hp: basic.maxHp, battery: basic.maxBattery};
}