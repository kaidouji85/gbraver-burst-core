// @flow

import test from 'ava';
import {feint} from "../../../../src/effect/battle/result/feint";

test('防御側がバッテリーを使った場合、防御側が動いたとみなす', t => {
  const result = feint(2);
  t.deepEqual(result, {
    name: 'Feint',
    isDefenderMoved: true
  });
});

test('防御側がバッテリーを使っていない場合、防御側が動いていないとみなす', t => {
  const result = feint(0);
  t.deepEqual(result, {
    name: 'Feint',
    isDefenderMoved: false
  });
});
