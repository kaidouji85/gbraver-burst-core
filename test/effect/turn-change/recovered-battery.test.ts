import { turnChangeRecoverBattery } from "../../../src/effect/turn-change/recover-battery";
test("回復量だけバッテリーに追加される", () => {
  expect(turnChangeRecoverBattery(2, 5, 2)).toBe(4);
});
test("バッテリー最大値以上にはならない", () => {
  expect(turnChangeRecoverBattery(2, 5, 6)).toBe(5);
});