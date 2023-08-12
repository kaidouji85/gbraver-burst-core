import {EmptyArmdozerEffect} from "../state/armdozer-effect/empty-armdozer-effect";
import {CorrectPower} from "../state/armdozer-effect/correct-power";
import {DamageHalved} from "../state/armdozer-effect/damage-halved";

/** 空のアームドーザエフェクト */
export const EMPTY_ARMDOZER_EFFECT: EmptyArmdozerEffect = {
  type: "Empty",
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

/** 空の攻撃力補正 */
export const EMPTY_CORRECT_POWER: CorrectPower = {
  type: "CorrectPower",
  power: 0,
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

/** 空のダメージ半減 */
export const EMPTY_DAMAGE_HALVED: DamageHalved = {
  type: "DamageHalved",
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};
