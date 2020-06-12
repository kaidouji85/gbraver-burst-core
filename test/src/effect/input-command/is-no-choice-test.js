// @flow

import test from 'ava';
import {isNoChoice} from "../../../../src/effect/input-command";
import type {Command} from "../../../../src";

test('相手だけがバーストを使った場合、コマンド選択不可能となる', t => {
  const myCommand: Command = {
    type: 'BATTERY_COMMAND',
    battery: 1
  };
  const otherCommand: Command = {
    type: 'BURST_COMMAND'
  }
  const result = isNoChoice(myCommand, otherCommand);
  t.true(result);
});


test('自分だけがバーストした場合、コマンド選択可能である', t => {
  const myCommand: Command = {
    type: 'BURST_COMMAND',
  };
  const otherCommand: Command = {
    type: 'BATTERY_COMMAND',
    battery: 3
  }
  const result = isNoChoice(myCommand, otherCommand);
  t.false(result);
});

test('違いにバッテリーコマンドの場合、操作可能である', t => {
  const myCommand: Command = {
    type: 'BATTERY_COMMAND',
    battery: 1
  };
  const otherCommand: Command = {
    type: 'BATTERY_COMMAND',
    battery: 2
  }
  const result = isNoChoice(myCommand, otherCommand);
  t.false(result);
});

test('違いにバーストコマンドの場合、操作可能である', t => {
  const myCommand: Command = {
    type: 'BURST_COMMAND',
  };
  const otherCommand: Command = {
    type: 'BURST_COMMAND',
  }
  const result = isNoChoice(myCommand, otherCommand);
  t.false(result);
});
