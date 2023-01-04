import type { PlayerState } from "../../../state/player-state";
import { correctPower } from "../../correct-power";
import { batteryBonus } from "./battery-bonus";

/**
 * ダメージ計算
 * ダメージ = 攻撃力 + 攻撃力補正 + バッテリーボーナス
 *
 * @param attacker 攻撃側プレイヤー
 * @param attackerBattery 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderBattery 防御側バッテリー
 * @return ダメージ
 */
export function normalHitDamage(attacker: PlayerState, attackerBattery: number, defender: PlayerState, defenderBattery: number): number {
  return attacker.armdozer.power + correctPower(attacker.armdozer.effects) + batteryBonus(attackerBattery, defenderBattery);
}