import { BattleResult } from "./battle-result";

/**
 * 攻撃がヒットしたか否かを判定する
 * @param result 戦闘結果
 * @returns 判定結果、trueで攻撃がヒットした
 */
export function isAttackHit(result: BattleResult): boolean {
  return (
    result.name === "NormalHit" ||
    result.name === "Guard" ||
    result.name === "CriticalHit"
  );
}
