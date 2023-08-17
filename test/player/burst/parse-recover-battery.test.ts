import { parseRecoverBattery, RecoverBattery } from "../../../src";

/** 有効なRecoverBattery */
const recoverBattery: RecoverBattery = {
  type: "RecoverBattery",
  recoverBattery: 5,
};

test("RecoverBatteryはパースできる", () => {
  expect(parseRecoverBattery(recoverBattery)).toEqual(recoverBattery);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(recoverBattery);
  const data = JSON.parse(str);
  expect(parseRecoverBattery(data)).toEqual(recoverBattery);
});

test("RecoverBattery以外はnullを返す", () => {
  const data = {
    type: "Battery",
    recover: 5,
  };
  expect(parseRecoverBattery(data)).toEqual(null);
});
