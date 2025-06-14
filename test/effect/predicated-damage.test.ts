import { predicatedDamage } from "../../src/effect/predicated-damage";
import { EMPTY_ARMDOZER_STATE } from "../../src/empty/armdozer";
import { EMPTY_PLAYER_STATE } from "../../src/empty/player";
import { ArmdozerEffect } from "../../src/state/armdozer-effect";
import { CorrectPower } from "../../src/state/armdozer-effect/correct-power";
import { DamageHalved } from "../../src/state/armdozer-effect/damage-halved";
import { PlayerState } from "../../src/state/player-state";

/**
 * 攻撃側プレイヤーのステートを生成する
 * @param power 攻撃
 * @param effects アームドーザ効果
 * @returns 生成結果
 */
const createAttacker = (
  power: number,
  effects: ArmdozerEffect[],
): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    power,
    effects,
  },
});

/**
 * 防御側プレイヤーのステートを生成する
 * @param effects アームドーザ効果
 * @returns 生成結果
 */
const createDefender = (effects: ArmdozerEffect[]): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    effects,
  },
});

/**
 * 攻撃補正を生成する
 * @param power 補正値
 * @returns 生成結果
 */
const createCorrectPower = (power: number): CorrectPower => ({
  type: "CorrectPower",
  power,
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
});

/** ダメージ半減効果 */
const damageHalved: DamageHalved = {
  type: "DamageHalved",
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

test("お互いにアームドーザ効果を持たない場合、攻撃が予測ダメージとなる", () => {
  const attacker = createAttacker(2000, []);
  const defender = createDefender([]);
  expect(predicatedDamage(attacker, defender)).toBe(2000);
});

test("攻撃補正効果は予想ダメージに加味される", () => {
  const attacker = createAttacker(2000, [createCorrectPower(600)]);
  const defender = createDefender([]);
  expect(predicatedDamage(attacker, defender)).toBe(2600);
});

test("ダメージ半減効果は予想ダメージに加算される", () => {
  const attacker = createAttacker(2000, []);
  const defender = createDefender([damageHalved]);
  expect(predicatedDamage(attacker, defender)).toBe(1000);
});

test("予想ダメージに加味されるすべての効果が含まれていても、正しく計算できる", () => {
  const attacker = createAttacker(2000, [createCorrectPower(600)]);
  const defender = createDefender([damageHalved]);
  expect(predicatedDamage(attacker, defender)).toBe(1300);
});
