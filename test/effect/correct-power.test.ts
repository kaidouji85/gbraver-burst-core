import {
  ArmdozerEffectsDisabled,
  CorrectPower,
  correctPower,
  HalveCorrectPower,
} from "../../src";

/** 攻撃補正半減 */
const halveCorrect: HalveCorrectPower = {
  type: "HalveCorrectPower",
  period: { type: "TurnLimit", remainingTurn: 1 },
};

/** 攻撃+1000 */
const plusCorrect: CorrectPower = {
  type: "CorrectPower",
  power: 1000,
  period: { type: "TurnLimit", remainingTurn: 1 },
};

/** 攻撃-1000 */
const minusCorrect: CorrectPower = {
  type: "CorrectPower",
  power: -1000,
  period: { type: "TurnLimit", remainingTurn: 1 },
};

/** アームドーザ効果無効 */
const armdozerEffectsDisabled: ArmdozerEffectsDisabled = {
  type: "ArmdozerEffectsDisabled",
  period: { type: "TurnLimit", remainingTurn: 1 },
};

test("攻撃補正半減効果を持たない場合、攻撃補正効果の合計が最終的な値になる", () => {
  const effects = [plusCorrect, plusCorrect, minusCorrect];
  const result = correctPower(effects);
  expect(result).toBe(1000);
});

test("攻撃補正半減効果を持つ場合、攻撃補正効果の合計の半分が最終的な値になる", () => {
  const effects = [plusCorrect, plusCorrect, minusCorrect, halveCorrect];
  const result = correctPower(effects);
  expect(result).toBe(500);
});

test("攻撃補正合計がマイナスの場合でも、攻撃補正半減効果は適用される", () => {
  const effects = [plusCorrect, minusCorrect, minusCorrect, halveCorrect];
  const result = correctPower(effects);
  expect(result).toBe(-500);
});

test("アームドーザ効果無効が含まれる場合、補正値は0となる", () => {
  const effects = [
    plusCorrect,
    minusCorrect,
    halveCorrect,
    armdozerEffectsDisabled,
  ];
  const result = correctPower(effects);
  expect(result).toBe(0);
});

test("アームドーザ効果が存在しない場合、補正値は0となる", () => {
  const result = correctPower([]);
  expect(result).toBe(0);
});
