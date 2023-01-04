import { correctPower } from "../../src";
const oneTurn = {
  type: "TurnLimit",
  remainingTurn: 1
};
const halveCorrect = {
  type: "HalveCorrectPower",
  period: oneTurn
};
const plusCorrect = {
  type: "CorrectPower",
  power: 1000,
  period: oneTurn
};
const minusCorrect = {
  type: "CorrectPower",
  power: -1000,
  period: oneTurn
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