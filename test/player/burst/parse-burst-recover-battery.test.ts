import {
  BurstRecoverBattery,
  parseBurstRecoverBattery,
} from "../../../src/player/burst/burst-recover-battery";

/** 有効なBurstRecoverBattery */
const burstRecoverBattery: BurstRecoverBattery = {
  recoverBattery: 3,
};

test("BurstRecoverBatteryはパースできる", () => {
  expect(parseBurstRecoverBattery(burstRecoverBattery)).toEqual(
    burstRecoverBattery,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(burstRecoverBattery);
  const data = JSON.parse(str);
  expect(parseBurstRecoverBattery(data)).toEqual(burstRecoverBattery);
});

test("BurstRecoverBattery以外はnullを返す", () => {
  const data = {
    recover: 3,
  };
  expect(parseBurstRecoverBattery(data)).toEqual(null);
});
