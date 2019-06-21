import type {PlayerState} from "../../../game-state/player-state";
import type {BatteryCommand} from "../../../command/battery";

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

/**
 * アームドーザの基礎攻撃力を計算する
 *
 * @param attacker 攻撃側プレイヤー
 * @return 基礎攻撃力
 */
export function power(attacker: PlayerState): number {
  const correct = attacker.armdozer.effects
    .filter(v => v.type === 'CorrectPower')
    .map(v => v.power)
    .reduce((a, b) => a + b, 0);
  return attacker.armdozer.power + correct;
}
