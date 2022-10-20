// @flow

import type { PlayerId } from "../../player/player";

/** 攻撃、防御側のバッテリー宣言 */
export type BatteryDeclaration = {
  name: "BatteryDeclaration",
  /** 攻撃側プレイヤー */
  attacker: PlayerId,
  /** 攻撃側バッテリー */
  attackerBattery: number,
  /** 本来の攻撃側バッテリー */
  originalBatteryOfAttacker: number,
  /** 防御側バッテリー */
  defenderBattery: number,
  /** 本来の防御側バッテリー */
  originalBatteryOfDefender: number,
};
