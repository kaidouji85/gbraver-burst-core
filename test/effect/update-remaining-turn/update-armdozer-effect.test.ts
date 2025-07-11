import { updateArmdozerEffect } from "../../../src/effect/update-remaining-turn/armdozer-effect";
import { EMPTY_ARMDOZER_EFFECT } from "../../../src/empty/amrdozer-effect";
import { ArmdozerEffect } from "../../../src/state/armdozer-effect";

test("ターン制限付き効果なら、継続ターン数を-1する", () => {
  const data: ArmdozerEffect = {
    ...EMPTY_ARMDOZER_EFFECT,
    period: {
      type: "TurnLimit",
      remainingTurn: 3,
    },
  };
  const result = updateArmdozerEffect(data);
  const expexted = {
    ...EMPTY_ARMDOZER_EFFECT,
    period: {
      type: "TurnLimit",
      remainingTurn: 2,
    },
  };
  expect(result).toEqual(expexted);
});

test("ターン制限付き効果以外なら、変化はない", () => {
  const data: ArmdozerEffect = {
    ...EMPTY_ARMDOZER_EFFECT,
    period: {
      type: "SpecialPeriod",
    },
  };
  const result = updateArmdozerEffect(data);
  const expected = data;
  expect(result).toEqual(expected);
});
