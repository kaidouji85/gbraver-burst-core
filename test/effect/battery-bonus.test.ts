import { batteryBonus } from "../../src/effect/battery-bonus";

test("ダメージのバッテリーボーナス = 100 * (攻撃側バッテリー - 防御側バッテリー - 1)", () => {
  const result = batteryBonus(5, 1);
  expect(result).toBe(300);
});

test("攻撃側バッテリーが防御側バッテリーを1上回っている時は、バッテリーボーナスはなし", () => {
  const result = batteryBonus(4, 3);
  expect(result).toBe(0);
});

test("攻撃側バッテリーと防御側バッテリーが同じ場合、バッテリーボーナスはなし", () => {
  const result = batteryBonus(0, 0);
  expect(result).toBe(0);
});

test("攻撃側バッテリーが防御側バッテリーより小さい場合、バッテリーボーナスはなし", () => {
  const result = batteryBonus(3, 5);
  expect(result).toBe(0);
});
