import type { ArmdozerEffect } from "../../state/armdozer-effect";

/**
 * アームドーザ効果の継続ターン数を更新する
 *
 * @param effect 更新前
 * @return 更新結果
 */
export function updateArmdozerEffect(effect: ArmdozerEffect): ArmdozerEffect {
  if (effect.period.type === "TurnLimit") {
    const updatedPeriod = {
      ...effect.period,
      remainingTurn: effect.period.remainingTurn - 1,
    };
    return { ...effect, period: updatedPeriod };
  }

  return effect;
}

/**
 * アームドーザ効果が継続するか否かを判定する、trueで継続する
 *
 * @param effect 判定対象
 * @return 判定結果
 */
export function isRemainArmdozerEffect(effect: ArmdozerEffect): boolean {
  if (effect.period.type === "TurnLimit") {
    return 0 < effect.period.remainingTurn;
  }

  return true;
}
