import { BurstEffectSchema } from "../../../src";
import { validBurstEffect } from "./valid-burst-effect";

test("BurstEffectはパースできる", () => {
  expect(BurstEffectSchema.parse(validBurstEffect)).toEqual(validBurstEffect);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(validBurstEffect);
  const data = JSON.parse(str);
  expect(BurstEffectSchema.parse(data)).toEqual(validBurstEffect);
});

test("BurstEffect以外はパースできない", () => {
  const data = {
    type: "BurstEffect",
    burstPlayer: "burst-player",
    burst: {
      name: "RecoverBattery",
      battery: 5,
    },
  };
  expect(() => BurstEffectSchema.parse(data)).toThrow();
});
