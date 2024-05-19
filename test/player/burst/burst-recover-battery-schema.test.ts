import {
  BurstRecoverBattery,
  BurstRecoverBatterySchema,
} from "../../../src/player/burst/burst-recover-battery";

/** 有効なBurstRecoverBattery */
const burstRecoverBattery: BurstRecoverBattery = {
  recoverBattery: 3,
};

test("BurstRecoverBatteryはパースできる", () => {
  expect(BurstRecoverBatterySchema.parse(burstRecoverBattery)).toEqual(
    burstRecoverBattery,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(burstRecoverBattery);
  const data = JSON.parse(str);
  expect(BurstRecoverBatterySchema.parse(data)).toEqual(burstRecoverBattery);
});

test("BurstRecoverBattery以外は例外を投げる", () => {
  const data = {
    recover: 3,
  };
  expect(() => BurstRecoverBatterySchema.parse(data)).toThrow();
});
