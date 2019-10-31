//@flow

import test from 'ava';
import {correctPower} from "../../../../../src/effect/battle/damage/correct-power";
import {EMPTY_CORRECT_POWER} from "../../../../data/amrdozer-effect";

test('攻撃力補正の合計値を返す', t => {
  const result = correctPower([
    {...EMPTY_CORRECT_POWER, power: 1000},
    {...EMPTY_CORRECT_POWER, power: -500},
    {...EMPTY_CORRECT_POWER, power: 2000}
  ]);
  t.is(result, 2500);
});
