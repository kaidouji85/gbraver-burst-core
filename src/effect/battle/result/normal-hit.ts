import type { PlayerState } from "../../../state/player-state";
import { hasDamageHalved } from "../../damage-halved";
import { toMinDamage } from "../../to-min-damage";
import { normalHitDamage } from "../damage/damage";

/** 攻撃ヒット */
export type NormalHit = {
  name: "NormalHit";
  damage: number;
};

/**
 * 攻撃ヒットの戦闘結果を生成する
 *
 * @param attacker 攻撃側プレイヤー
 * @param attackerBattery 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderBattery 防御側バッテリー
 * @return 攻撃ヒットの戦闘結果
 */
export function normalHit(
  attacker: PlayerState,
  attackerBattery: number,
  defender: PlayerState,
  defenderBattery: number
): NormalHit {
  const normalHit = normalHitDamage(
    attacker,
    attackerBattery,
    defender,
    defenderBattery
  );
  const reduction = hasDamageHalved(defender.armdozer.effects) ? 0.5 : 1;
  const damage = toMinDamage(normalHit * reduction);
  return {
    name: "NormalHit",
    damage: damage,
  };
}
