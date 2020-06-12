// @flow
import test from 'ava';
import {getNotActivePlayer} from "../../../../src/effect/turn-change/not-active-player";

test('現在アクティブでないプレイヤーが返される', t =>{
  t.is(getNotActivePlayer('player1', ['player1', 'player2']), 'player2');
});
