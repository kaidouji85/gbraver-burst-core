import { ArmdozerEffect } from "../../../src";
import { isRemainArmdozerEffect } from "../../../src/effect/update-remaning-turn/armdozer-effect";
import { EMPTY_ARMDOZER_EFFECT } from "../../../src/empty/amrdozer-effect";

test("アームドーザ効果継続ターン数が1より大きい場合は効果継続する", () => {
  const data: ArmdozerEffect = {
    ...EMPTY_ARMDOZER_EFFECT,
    period: {
      type: "TurnLimit",
      remainingTurn: 1,
    },
  };
  const result = isRemainArmdozerEffect(data);
  expect(result).toBe(true);
});

test("アームドーザ効果継続ターン数が0以下の場合は効果が終了する", () => {
  const data: ArmdozerEffect = {
    ...EMPTY_ARMDOZER_EFFECT,
    period: {
      type: "TurnLimit",
      remainingTurn: 0,
    },
  };
  const result = isRemainArmdozerEffect(data);
  expect(result).toBe(false);
});

test("永続効果は効果継続すると見なす", () => {
  const data: ArmdozerEffect = {
    ...EMPTY_ARMDOZER_EFFECT,
    period: {
      type: "SpecialPeriod",
    },
  };
  const result = isRemainArmdozerEffect(data);
  expect(result).toBe(true);
});
