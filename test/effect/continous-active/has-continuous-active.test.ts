import { hasContinuousActive } from "../../../src/effect/continuous-active/has-continuous-active";
import { ArmdozerEffect } from "../../../src/state/armdozer-effect";
import { ContinuousActivePlayer } from "../../../src/state/armdozer-effect/continuous-active-player";
import { CorrectPower } from "../../../src/state/armdozer-effect/correct-power";

const continuousActivePlayer: ContinuousActivePlayer = {
  type: "ContinuousActivePlayer",
  period: {
    type: "SpecialPeriod",
  },
};

const correctPower: CorrectPower = {
  type: "CorrectPower",
  power: 1000,
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

test("アクティブプレイヤー継続を含むことを正しく判定できる", () => {
  const effects: ArmdozerEffect[] = [continuousActivePlayer];
  expect(hasContinuousActive(effects)).toBe(true);
});

test("アクティブプレイヤー継続を含まないことを正しく判定できる", () => {
  const effects = [correctPower];
  expect(hasContinuousActive(effects)).toBe(false);
});

test("複数アームドーザ効果の中にアクティブプレイヤー継続が含まれていても正しく判定できる", () => {
  const effects = [
    correctPower,
    continuousActivePlayer,
    continuousActivePlayer,
    correctPower,
  ];
  expect(hasContinuousActive(effects)).toBe(true);
});

test("アームドーザ効果が空の場合、アクティブプレイヤー継続は含まれていないと判定する", () => {
  const effects: ArmdozerEffect[] = [];
  expect(hasContinuousActive(effects)).toBe(false);
});
