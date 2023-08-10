import { LightningBarrier, parseLightningBarrier } from "../../src";

test("LightningBarrierはパースできる", () => {
  const data: LightningBarrier = {
    type: "LightningBarrier",
    damage: 2000,
    duration: 2,
    recoverBattery: 3,
  };
  expect(parseLightningBarrier(data)).toEqual(data);
});

test("LightningBarrier以外はnullを返す", () => {
  const data = {
    type: "Barrier",
    reflectedDamage: 2000,
    effectDuration: 2,
    recover: 3,
  };
  expect(parseLightningBarrier(data)).toBe(null);
});