import { PlayerState } from "../state/player-state";
import { correctPower } from "./correct-power";
import { damageReduction } from "./damage-reduction";
import { toMinDamage } from "./to-min-damage";

/**
 * ダメージ予想を計算する
 * @param attacker 攻撃側ステート
 * @param defender 防御側ステート
 * @returns 計算結果
 */
export const predicatedDamage = (
  attacker: PlayerState,
  defender: PlayerState,
): number =>
  toMinDamage(
    (attacker.armdozer.power + correctPower(attacker.armdozer.effects)) *
      damageReduction(defender.armdozer.effects),
  );
