import { RecoverBattery, RecoverBatterySchema } from "../../../src";

/** 有効なRecoverBattery */
const recoverBattery: RecoverBattery = {
  type: "RecoverBattery",
  recoverBattery: 5,
  turnStartBatteryCorrect: 1,
};

test("RecoverBatteryはパースできる", () => {
  expect(RecoverBatterySchema.parse(recoverBattery)).toEqual(recoverBattery);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(recoverBattery);
  const data = JSON.parse(str);
  expect(RecoverBatterySchema.parse(data)).toEqual(recoverBattery);
});

test("RecoverBattery以外は例外を投げる", () => {
  const data = {
    type: "Battery",
    recover: 5,
    turnStartBattery: 1,
  };
  expect(() => RecoverBatterySchema.parse(data)).toThrow();
});
