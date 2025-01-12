import {
  ArmdozerEffectsDisabled,
  ArmdozerEffectsDisabledSchema,
  CorrectPowerSchema,
} from "../../../src";

/** 有効なArmdozerEffectsDisabled */
const armdozerEffectsDisabledTest: ArmdozerEffectsDisabled = {
  type: "ArmdozerEffectsDisabled",
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

test("ArmdozerEffectsDisabledはパースできる", () => {
  expect(
    ArmdozerEffectsDisabledSchema.parse(armdozerEffectsDisabledTest),
  ).toEqual(armdozerEffectsDisabledTest);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(armdozerEffectsDisabledTest);
  const data = JSON.parse(str);
  expect(ArmdozerEffectsDisabledSchema.parse(data)).toEqual(
    armdozerEffectsDisabledTest,
  );
});

test("CorrectPower以外はパースできない", () => {
  const data = {
    type: "ArmdozerEffectsDisabled",
    effectPeriod: {
      type: "TurnLimit",
      remaining: 1,
    },
  };
  expect(() => ArmdozerEffectsDisabledSchema.parse(data)).toThrow();
});
