import { ArmdozerEffect } from "../state/armdozer-effect";
import { hasDamageHalved } from "./damage-halved";
import { hasArmdozerEffectsDisabled } from "./has-armdozer-effects-disabled";

/**
 * ダメージ減少率を計算する
 * @param effects 防御側に適用されているアームドーザ効果
 * @returns 計算結果
 */
export const damageReduction = (effects: ArmdozerEffect[]): number =>
  hasDamageHalved(effects) && !hasArmdozerEffectsDisabled(effects) ? 0.5 : 1;
