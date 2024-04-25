import { z } from "zod";

import { PlayerState } from "../../../state/player-state";
import { damageReduction } from "../../damage-reduction";
import { toMinDamage } from "../../to-min-damage";
import { normalHitDamage } from "../damage/damage";

/** 攻撃ヒット */
export type NormalHit = Readonly<{
  name: "NormalHit";
  /** ダメージ */
  damage: number;
}>;

/** NormalHit zodスキーマ */
export const NormalHitSchema = z.object({
  name: z.literal("NormalHit"),
  damage: z.number(),
});

/**
 * 攻撃ヒットの戦闘結果を生成する
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
  defenderBattery: number,
): NormalHit {
  const normalHit = normalHitDamage(
    attacker,
    attackerBattery,
    defender,
    defenderBattery,
  );
  const reduction = damageReduction(defender);
  const damage = toMinDamage(normalHit * reduction);
  return {
    name: "NormalHit",
    damage: damage,
  };
}
