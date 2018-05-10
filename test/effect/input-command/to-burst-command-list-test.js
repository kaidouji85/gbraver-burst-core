// @flow

import test from 'ava';
import {toBurstCommandList} from "../../../src/effect/input-command/enable-burst-command";

test('バースト可能なら、バーストコマンドを1個だけ返す', t => {
  t.deepEqual(toBurstCommandList(true), [{type: 'BURST_COMMAND'}]);
});

test('バースト不可能なら、空配列を返す', t => {
  t.deepEqual(toBurstCommandList(false), []);
});