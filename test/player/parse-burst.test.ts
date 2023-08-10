import { Burst, parseBurst } from "../../src";

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
  }
];

test("Burstはパースできる", () => {
  bursts.forEach(burst => {
    expect(parseBurst(burst)).toEqual(burst);  
  });
});

test("Burst以外はパースできない", () => {
  const data = {
    type: "Continuous",
    battery: 3,
  };
  expect(parseBurst(data)).toBe(null);
});
