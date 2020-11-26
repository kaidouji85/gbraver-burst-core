//@flow

import test from 'ava';
import {correctPower} from "../../../../../src/effect/battle/damage/correct-power";
import {EMPTY_CORRECT_POWER} from "../../../../data/amrdozer-effect";


// TODO 攻撃力補正以外のアームドーザ効果を追加する
// TODO 空配列、攻撃補正以外だけの配列のテストケースを追加する
test('攻撃力補正の合計値を返す', t => {
  const result = correctPower([
    {...EMPTY_CORRECT_POWER, power: 1000},
    {...EMPTY_CORRECT_POWER, power: -500},
    {...EMPTY_CORRECT_POWER, power: 2000}
  ]);
  t.is(result, 2500);
});
