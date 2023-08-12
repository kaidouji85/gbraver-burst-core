import { ArmdozerEffect } from "../state/armdozer-effect";

/**
 * バッテリー回復スキップ効果を削除する
 * @param player 効果削除対象のアームドーザ効果コレクション
 * @return 更新結果
 */
export function removeBatteryRecoverSkip(
  effects: ArmdozerEffect[],
): ArmdozerEffect[] {
  return effects.filter((v) => v.type !== "BatteryRecoverSkip");
}
