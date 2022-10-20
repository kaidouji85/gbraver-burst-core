//@flow

import { totalCorrectPower } from "../../src/effect/correct-power";
import {
  EMPTY_ARMDOZER_EFFECT,
  EMPTY_CORRECT_POWER,
} from "../../src/empty/amrdozer-effect";

test("攻撃力補正の合計値を返す", () => {
  const result = totalCorrectPower([
    { ...EMPTY_CORRECT_POWER, power: 1000 },
    { ...EMPTY_CORRECT_POWER, power: -500 },
    { ...EMPTY_CORRECT_POWER, power: 2000 },
  ]);
  expect(result).toBe(2500);
});

test("アームドーザ効果が空の場合には0を返す", () => {
  const result = totalCorrectPower([]);
  expect(result).toBe(0);
});

test("攻撃補正以外のアームドーザ効果は無視する", () => {
  const result = totalCorrectPower([
    EMPTY_ARMDOZER_EFFECT,
    { ...EMPTY_CORRECT_POWER, power: -500 },
    { ...EMPTY_CORRECT_POWER, power: 2000 },
  ]);
  expect(result).toBe(1500);
});
