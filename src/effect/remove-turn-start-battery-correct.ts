import { ArmdozerEffect } from "../state/armdozer-effect";

/**
 * ターン開始時バッテリー回復量の補正を削除する
 * @param effects 効果削除対象のアームドーザ効果コレクション
 * @returns 更新結果
 */
export function removeTurnStartBatteryCorrect(
  effects: ArmdozerEffect[],
): ArmdozerEffect[] {
  return effects.filter((v) => v.type !== "TurnStartBatteryCorrect");
}
