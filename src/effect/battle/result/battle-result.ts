import { z } from "zod";

import type { PlayerState } from "../../../state/player-state";
import type { CriticalHit } from "./critical-hit";
import { criticalHit, CriticalHitSchema } from "./critical-hit";
import type { Feint } from "./feint";
import { feint, FeintSchema } from "./feint";
import type { Guard } from "./guard";
import { guard, GuardSchema } from "./guard";
import { type Miss, MissSchema } from "./miss";
import type { NormalHit } from "./normal-hit";
import { normalHit, NormalHitSchema } from "./normal-hit";

/** 戦闘結果をまとめたもの */
export type BattleResult = NormalHit | Guard | CriticalHit | Miss | Feint;

/**BattleResult zodスキーマ  */
export const BattleResultSchema = z.union([
  NormalHitSchema,
  GuardSchema,
  CriticalHitSchema,
  MissSchema,
  FeintSchema,
]);

/**
 * 戦闘結果を生成して返す
 *
 * @param attacker 攻撃側プレイヤー
 * @param attackerBattery 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderBattery 防御側バッテリー
 * @return 戦闘結果
 */
export function battleResult(
  attacker: PlayerState,
  attackerBattery: number,
  defender: PlayerState,
  defenderBattery: number,
): BattleResult {
  if (attackerBattery === 0) {
    return feint(defenderBattery);
  }

  if (attackerBattery === defenderBattery) {
    return guard(attacker, defender);
  }

  if (defenderBattery < attackerBattery && defenderBattery === 0) {
    return criticalHit();
  }

  if (defenderBattery < attackerBattery) {
    return normalHit(attacker, attackerBattery, defender, defenderBattery);
  }

  return {
    name: "Miss",
  };
}
