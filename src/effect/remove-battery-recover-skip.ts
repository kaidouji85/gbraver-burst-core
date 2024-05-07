import { ArmdozerEffect } from "../state/armdozer-effect";

/**
 * バッテリー回復スキップ効果を削除する
 * @param effects 効果削除対象のアームドーザ効果コレクション
 * @returns 更新結果
 */
export function removeBatteryRecoverSkip(
  effects: ArmdozerEffect[],
): ArmdozerEffect[] {
  return effects.filter((v) => v.type !== "BatteryRecoverSkip");
}
