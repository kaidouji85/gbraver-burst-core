// @flow

import {feint} from "../../../../src/effect/battle/result/feint";

test('防御側がバッテリーを使った場合、防御側が動いたとみなす', () => {
  const result = feint(2);
  expect(result).toEqual({
    name: 'Feint',
    isDefenderMoved: true
  });
});

test('防御側がバッテリーを使っていない場合、防御側が動いていないとみなす', () => {
  const result = feint(0);
  expect(result).toEqual({
    name: 'Feint',
    isDefenderMoved: false
  });
});
