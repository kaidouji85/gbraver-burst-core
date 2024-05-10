import { ArmdozerEffect, ArmdozerEffectSchema } from "../../../src";

/** 有効なArmdozerEffect */
const armdozerEffects: ArmdozerEffect[] = [
  {
    type: "Empty",
    period: {
      type: "TurnLimit",
      remainingTurn: 1,
    },
  },
  {
    type: "CorrectPower",
    power: 1000,
    period: {
      type: "TurnLimit",
      remainingTurn: 2,
    },
  },
  {
    type: "HalveCorrectPower",
    period: {
      type: "TurnLimit",
      remainingTurn: 2,
    },
  },
  {
    type: "TryReflect",
    effect: "Lightning",
    damage: 2000,
    period: {
      type: "TurnLimit",
      remainingTurn: 2,
    },
  },
  {
    type: "ContinuousActivePlayer",
    period: {
      type: "SpecialPeriod",
    },
  },
  {
    type: "BatteryCorrection",
    batteryCorrection: 1000,
    period: {
      type: "TurnLimit",
      remainingTurn: 2,
    },
  },
  {
    type: "DamageHalved",
    period: {
      type: "TurnLimit",
      remainingTurn: 1,
    },
  },
  {
    type: "BatteryRecoverSkip",
    period: {
      type: "SpecialPeriod",
    },
  },
  {
    type: "TurnStartBatteryCorrect",
    correctBattery: 1,
    period: {
      type: "TurnLimit",
      remainingTurn: 1,
    },
  },
];

test("ArmdozerEffectはパースできる", () => {
  armdozerEffects.forEach((effect) => {
    expect(ArmdozerEffectSchema.parse(effect)).toEqual(effect);
  });
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  armdozerEffects.forEach((effect) => {
    const str = JSON.stringify(effect);
    const data = JSON.parse(str);
    expect(ArmdozerEffectSchema.parse(data)).toEqual(effect);
  });
});

test("ArmdozerEffect以外はパースできない", () => {
  const data = {
    type: "CorrectPower",
    powerUp: 1000,
    period: {
      type: "TurnLimit",
      remaining: 1,
    },
  };
  expect(() => ArmdozerEffectSchema.parse(data)).toThrow();
});
