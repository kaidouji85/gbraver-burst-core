import type { PlayerState } from "../../../state/player-state";
import type { BattleResult } from "../result/battle-result";

/**
 * 戦闘結果に応じて防御側ステータスを更新する
 *
 * @param result 戦闘結果
 * @param defender 更新前の防御側ステータス
 * @return 更新された防御側ステータス
 */
export function updateDefender(result: BattleResult, defender: PlayerState): PlayerState {
  return { ...defender,
    armdozer: { ...defender.armdozer,
      hp: updateDefenderHP(result, defender.armdozer.hp)
    }
  };
}

/**
 * 戦闘結果に応じて、防御側のHPを更新する
 *
 * @param result 戦闘結果
 * @param hp 更新前の防御側HP
 * @return 更新後の防御側HP
 */
export function updateDefenderHP(result: BattleResult, hp: number): number {
  switch (result.name) {
    case "NormalHit":
    case "Guard":
    case "CriticalHit":
      return hp - result.damage;

    default:
      return hp;
  }
}