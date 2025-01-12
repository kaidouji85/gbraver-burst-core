import { ArmdozerEffect, BatteryCommand, BatteryCorrection } from "../../src";
import { correctedBattery } from "../../src/effect/battery-correction";

/**
 * バッテリー補正を作成する
 * @param batteryCorrection バッテリー補正値
 * @returns 生成結果
 */
const createBatteryCorrection = (
  batteryCorrection: number,
): BatteryCorrection => ({
  type: "BatteryCorrection",
  batteryCorrection,
  period: { type: "TurnLimit", remainingTurn: 1 },
});

test("補正後バッテリーが正しく計算できる", () => {
  const battery: BatteryCommand = { type: "BATTERY_COMMAND", battery: 1 };
  const effects = [createBatteryCorrection(2)];
  const result = correctedBattery(battery, effects);
  expect(result).toBe(3);
});

test("バッテリーが0の場合は補正されない", () => {
  const battery: BatteryCommand = { type: "BATTERY_COMMAND", battery: 0 };
  const effects = [createBatteryCorrection(2)];
  const result = correctedBattery(battery, effects);
  expect(result).toBe(0);
});

test("補正後バッテリーが0より小さい場合、結果を0とみなす", () => {
  const battery: BatteryCommand = { type: "BATTERY_COMMAND", battery: 3 };
  const effects = [createBatteryCorrection(-4)];
  const result = correctedBattery(battery, effects);
  expect(result).toBe(0);
});

test("アームドーザ効果が空の場合、元の値をそのまま返す", () => {
  const battery: BatteryCommand = { type: "BATTERY_COMMAND", battery: 4 };
  const effects: ArmdozerEffect[] = [];
  const result = correctedBattery(battery, effects);
  expect(result).toBe(4);
});
