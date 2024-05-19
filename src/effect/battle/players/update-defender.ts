import { PlayerState } from "../../../state/player-state";
import { BattleResult } from "../result/battle-result";

/**
 * 戦闘結果に応じて、防御側のHPを更新する
 * @param result 戦闘結果
 * @param hp 更新前の防御側HP
 * @returns 更新後の防御側HP
 */
const updateDefenderHP = (result: BattleResult, hp: number) =>
  result.name === "NormalHit" ||
  result.name === "Guard" ||
  result.name === "CriticalHit"
    ? hp - result.damage
    : hp;

/**
 * 戦闘結果に応じて防御側ステータスを更新する
 * @param result 戦闘結果
 * @param defender 更新前の防御側ステータス
 * @returns 更新された防御側ステータス
 */
export const updateDefender = (
  result: BattleResult,
  defender: PlayerState,
): PlayerState => ({
  ...defender,
  armdozer: {
    ...defender.armdozer,
    hp: updateDefenderHP(result, defender.armdozer.hp),
  },
});
