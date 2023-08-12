import type { ArmdozerEffect } from "../../state/armdozer-effect/armdozer-effect";

/**
 * アクティブプレイヤー継続を取り除く
 *
 * @param origin 処理対象
 * @return 処理結果
 */
export function removeContinuousActive(
  origin: ArmdozerEffect[],
): ArmdozerEffect[] {
  const removeTarget = origin.find((v) => v.type === "ContinuousActivePlayer");

  if (!removeTarget) {
    return origin;
  }

  return origin.filter((v) => v !== removeTarget);
}
