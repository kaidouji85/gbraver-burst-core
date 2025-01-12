import { ArmdozerEffect } from "../state/armdozer-effect";

/**
 * アームドーザ効果無効であるかを判定する
 * @param effects 適用されているアームドーザ効果
 * @returns 判定結果、trueでアームドーザ効果無効
 */
export const hasArmdozerEffectsDisabled = (effects: ArmdozerEffect[]) =>
  effects.some((effect) => effect.type === "ArmdozerEffectsDisabled");
