import { Burst, BurstSchema } from "../../../src";

/** 有効なバースト */
const bursts: Burst[] = [
  {
    type: "RecoverBattery",
    recoverBattery: 5,
  },
  {
    type: "BuffPower",
    buffPower: 1000,
    duration: 3,
    recoverBattery: 3,
  },
  {
    type: "LightningBarrier",
    damage: 2000,
    duration: 2,
    recoverBattery: 3,
  },
  {
    type: "ContinuousAttack",
    recoverBattery: 3,
  },
  {
    type: "BatteryLimitBreak",
    recoverBattery: 8,
    maxBattery: 8,
  },
];

test("Burstはパースできる", () => {
  bursts.forEach((burst) => {
    expect(BurstSchema.parse(burst)).toEqual(burst);
  });
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  bursts.forEach((burst) => {
    const str = JSON.stringify(burst);
    const data = JSON.parse(str);
    expect(BurstSchema.parse(data)).toEqual(burst);
  });
});

test("Burst以外はパースできない", () => {
  const data = {
    type: "Continuous",
    battery: 3,
  };
  expect(() => BurstSchema.parse(data)).toThrow();
});
