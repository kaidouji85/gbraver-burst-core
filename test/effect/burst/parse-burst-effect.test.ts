import { BurstEffect, parseBurstEffect } from "../../../src";

/** 有効なBurstEffect */
const burstEffect: BurstEffect = {
  name: "BurstEffect",
  burstPlayer: "burst-player",
  burst: {
    type: "RecoverBattery",
    recoverBattery: 5,
  }
};

test("BurstEffectはパースできる", () => {
  expect(parseBurstEffect(burstEffect)).toEqual(burstEffect);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(burstEffect);
  const data = JSON.parse(str);
  expect(parseBurstEffect(data)).toEqual(burstEffect);
});

test("BurstEffect以外はパースできない", () => {
  const data = {
    type: "BurstEffect",
    burstPlayer: "burst-player",
    burst: {
      name: "RecoverBattery",
      battery: 5,
    }
  };
  expect(parseBurstEffect(data)).toBeNull();
});
