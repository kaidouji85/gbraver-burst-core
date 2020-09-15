// @flow

import type {PlayerState} from "../../../state/player-state";
import type {BatteryCommand} from "../../../command/battery";
import {correctPower} from "./correct-power";
import {batteryBonus} from "./battery-bonus";

/**
 * ダメージ計算
 * ダメージ = 攻撃力 + 攻撃力補正 + バッテリーボーナス
 *
 * @param attacker 攻撃側プレイヤー
 * @param attackerCommand 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderCommand 防御側バッテリー
 * @return ダメージ
 */
export function normalHitDamage(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): number {
  return attacker.armdozer.power + correctPower(attacker.armdozer.effects) + batteryBonus(attackerCommand.battery, defenderCommand.battery);
}
