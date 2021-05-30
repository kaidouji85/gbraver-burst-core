// @flow

import test from 'ava';
import {EMPTY_PLAYER} from "../../src";
import {isDuplicatePlayers} from "../../src/player/game-players";

const player1 = {
  ...EMPTY_PLAYER,
  playerId: 'player1'
};

const player2 = {
  ...EMPTY_PLAYER,
  playerId: 'player2'
};

test('同じIDを持つプレイヤーが2人いると、ユーザ重複であると', t => {
  const result = isDuplicatePlayers([player1, player1]);
  t.true(result);
});

test('IDが違うユーザ同士だと、ユーザ重複でない', t => {
  const result = isDuplicatePlayers([player1, player2]);
  t.false(result);
});