// @flow
import test from 'ava';
import {getNextActivePlayer} from "../../../src/effect/turn-change/next-active-player";

test('現在アクティブでないプレイヤーが返される', t =>{
  t.is(getNextActivePlayer('player1', ['player1', 'player2']), 'player2');
  t.pass();
});
