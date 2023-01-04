import type { ArmdozerEffect } from "../../state/armdozer-effect";

/**
 * アクティブプレイヤー継続を持つか否かを判定する
 *
 * @param effects 判定対象のアームドーザ効果
 * @return 判定結果、trueでアクティブプレイヤー継続を持つ
 */
export function hasContinuousActive(effects: ArmdozerEffect[]): boolean {
  return effects.filter(v => v.type === "ContinuousActivePlayer").length > 0;
}