import type {PlayerState} from "../../../game-state/player-state";
import type {BatteryCommand} from "../../../command/battery";
import {power} from "./power";
import {batteryBonus} from "./battery-bonus";

/**
 * 攻撃ヒット時のダメージ計算
 *
 * @param attacker 攻撃側プレイヤー
 * @param attackerCommand 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderCommand 防御側バッテリー
 * @return ダメージ
 */
export function normalHitDamage(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): number {
  return power(attacker) + batteryBonus(attackerCommand.battery, defenderCommand.battery);
}
