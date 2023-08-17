import { LightningBarrier, parseLightningBarrier } from "../../../src";

/** 有効なLightningBarrier */
const lightningBarrier: LightningBarrier = {
  type: "LightningBarrier",
  damage: 2000,
  duration: 2,
  recoverBattery: 3,
};

test("LightningBarrierはパースできる", () => {
  expect(parseLightningBarrier(lightningBarrier)).toEqual(lightningBarrier);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(lightningBarrier);
  const data = JSON.parse(str);
  expect(parseLightningBarrier(data)).toEqual(lightningBarrier);
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
