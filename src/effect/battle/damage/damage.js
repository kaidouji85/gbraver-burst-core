import type {PlayerState} from "../../../game-state/player-state";
import type {BatteryCommand} from "../../../command/battery";
import {power} from "./power";

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
  return power(attacker) + 100 * (attackerCommand.battery - defenderCommand.battery - 1);
}