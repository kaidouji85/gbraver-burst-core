import { hasHalveCorrectPower } from "../../src";
import {
  ArmdozerEffect,
  CorrectPower,
  HalveCorrectPower,
  TurnLimitEffect,
} from "../../src/state/armdozer-effect";

const oneTurn: TurnLimitEffect = {
  type: "TurnLimit",
  remainingTurn: 1,
};
const halveCorrectPower: HalveCorrectPower = {
  type: "HalveCorrectPower",
  period: oneTurn,
};
const correctPower: CorrectPower = {
  type: "CorrectPower",
  power: 1000,
  period: oneTurn,
};

test("攻撃補正半減効果を持つことを正しく判定できる", () => {
  const effects = [halveCorrectPower];
  const result = hasHalveCorrectPower(effects);
  expect(result).toBe(true);
});

test("攻撃補正半減効果を複数持つ場合でも、正しく判定できる", () => {
  const effects = [halveCorrectPower, halveCorrectPower];
  const result = hasHalveCorrectPower(effects);
  expect(result).toBe(true);
});

test("アームドーザ効果が空の場合、攻撃補正半減効果を持たないと判定する", () => {
  const effects: ArmdozerEffect[] = [];
  const result = hasHalveCorrectPower(effects);
  expect(result).toBe(false);
});

test("攻撃補正半減とそれ以外の効果が含まれる場合、半減効果を持つと判定する", () => {
  const effects = [correctPower, halveCorrectPower];
  const result = hasHalveCorrectPower(effects);
  expect(result).toBe(true);
});

test("攻撃補正以外の効果を複数持つ場合、半減効果は持たないと判定する", () => {
  const effects = [correctPower, correctPower];
  const result = hasHalveCorrectPower(effects);
  expect(result).toBe(false);
});
