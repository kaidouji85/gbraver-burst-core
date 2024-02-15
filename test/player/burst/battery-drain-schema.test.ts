import { BatteryDrain, BatteryDrainSchema } from "../../../src";

/** 有効なBatteryLimitDrain */
const batteryDrain: BatteryDrain = {
  type: "BatteryDrain",
  recoverBattery: 2,
  batteryDecrease: -2,
};

test("BatteryDrainはパースできる", () => {
  expect(BatteryDrainSchema.parse(batteryDrain)).toEqual(batteryDrain);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(batteryDrain);
  const data = JSON.parse(str);
  expect(BatteryDrainSchema.parse(data)).toEqual(batteryDrain);
});

test("BatteryDrain以外はnullを返す", () => {
  const data = {
    type: "BatteryDrain",
    recover: 2,
    decrease: -2,
  };
  expect(() => BatteryDrainSchema.parse(data)).toThrow();
});
