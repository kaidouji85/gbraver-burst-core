// @flow

import type {PlayerId} from "../../player/player";

/** 攻撃、防御側のバッテリー宣言 */
export type BatteryDeclaration = {
  type: 'BatteryDeclaration',
  /** 攻撃側プレイヤー */
  attacker: PlayerId,
  /** 攻撃側バッテリー */
  attackerBattery: number,
  /** 防御側バッテリー */
  defenderBattery: number,
};