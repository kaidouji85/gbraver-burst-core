import { z } from "zod";

import { PlayerState } from "../../../state/player-state";
import { correctPower } from "../../correct-power";
import { damageReduction } from "../../damage-reduction";
import { toMinDamage } from "../../to-min-damage";

/** ガード */
export type Guard = Readonly<{
  name: "Guard";
  /** ダメージ */
  damage: number;
}>;

/** Guard zodスキーマ */
export const GuardSchema = z.object({
  name: z.literal("Guard"),
  damage: z.number(),
});

/**
 * 防御の戦闘結果を生成する
 * @param attacker 攻撃側プレイヤー
 * @param defender 防御側プレイヤー
 * @return 防御の戦闘結果
 */
export function guard(attacker: PlayerState, defender: PlayerState): Guard {
  const damage = toMinDamage(
    (attacker.armdozer.power + correctPower(attacker.armdozer.effects)) *
      damageReduction(defender) *
      0.5,
  );
  return {
    name: "Guard",
    damage,
  };
}
