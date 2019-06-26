// @flow

import test from 'ava';
import {updateRemainingTurn} from "../../../../src/effect/turn-change/update-remaining-turn";
import {EMPTY_CORRECT_POWER} from "../../../data/amrdozer-effect";

test('残りターンが-1される', t => {
  const result = updateRemainingTurn([{...EMPTY_CORRECT_POWER, remainingTurn: 3}]);
  t.deepEqual(result, [{...EMPTY_CORRECT_POWER, remainingTurn: 2}]);
});

test('残りターン1のものは、リストから除外される', t => {
  const result = updateRemainingTurn([{...EMPTY_CORRECT_POWER, remainingTurn: 1}]);
  t.deepEqual(result, []);
});

test('複数時限効果があっても、正しく更新できる', t => {
  const origin = [
    {...EMPTY_CORRECT_POWER, remainingTurn: 3},
    {...EMPTY_CORRECT_POWER, remainingTurn: 1},
    {...EMPTY_CORRECT_POWER, remainingTurn: 5},
    {...EMPTY_CORRECT_POWER, remainingTurn: 4},
  ];
  const result = updateRemainingTurn(origin);
  t.deepEqual(result, [
    {...EMPTY_CORRECT_POWER, remainingTurn: 2},
    {...EMPTY_CORRECT_POWER, remainingTurn: 4},
    {...EMPTY_CORRECT_POWER, remainingTurn: 3},
  ])
});