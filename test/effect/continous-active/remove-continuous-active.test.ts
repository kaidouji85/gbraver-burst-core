import type { ArmdozerEffect, CorrectPower } from "../../../src";
import { removeContinuousActive } from "../../../src/effect/continuous-active/remove-continuous-active";

import {ContinuousActivePlayer} from "../../../src/state/armdozer-effect/continuous-active-player";

const CORRECT_POWER: CorrectPower = {
  type: "CorrectPower",
  power: 1000,
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

const CONTINUOUS_ACTIVE_PLAYER: ContinuousActivePlayer = {
  type: "ContinuousActivePlayer",
  period: {
    type: "SpecialPeriod",
  },
};

test("アームドーザ効果からアクティブプレイヤー継続のみが排除される", () => {
  const origin: ArmdozerEffect[] = [CORRECT_POWER, CONTINUOUS_ACTIVE_PLAYER];
  const result = removeContinuousActive(origin);
  const expected = [CORRECT_POWER];
  expect(result).toEqual(expected);
});

test("アームドーザ効果にアクティブプレイヤー継続が含まれない場合、何もしない", () => {
  const origin: ArmdozerEffect[] = [CORRECT_POWER];
  const result = removeContinuousActive(origin);
  const expected = [CORRECT_POWER];
  expect(result).toEqual(expected);
});
