import { toMinDamage } from "../../src/effect/to-min-damage";

test("マイナスダメージを0に修正する", () => {
  const result = toMinDamage(-1000);
  expect(result).toBe(0);
});

test("0ダメージはそのまま", () => {
  const result = toMinDamage(0);
  expect(result).toBe(0);
});

test("プラスダメージはそのまま", () => {
  const result = toMinDamage(1000);
  expect(result).toBe(1000);
});
