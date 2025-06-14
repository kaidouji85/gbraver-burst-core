import {
  LightningBarrier,
  LightningBarrierSchema,
} from "../../../src/player/burst/lightning-barrier";

/** 有効なLightningBarrier */
const lightningBarrier: LightningBarrier = {
  type: "LightningBarrier",
  damage: 2000,
  duration: 2,
  recoverBattery: 3,
};

test("LightningBarrierはパースできる", () => {
  expect(LightningBarrierSchema.parse(lightningBarrier)).toEqual(
    lightningBarrier,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(lightningBarrier);
  const data = JSON.parse(str);
  expect(LightningBarrierSchema.parse(data)).toEqual(lightningBarrier);
});

test("LightningBarrier以外は例外を投げる", () => {
  const data = {
    type: "Barrier",
    reflectedDamage: 2000,
    effectDuration: 2,
    recover: 3,
  };
  expect(() => LightningBarrierSchema.parse(data)).toThrow();
});
