// @flow

import test from 'ava';
import {isNoChoice} from "../../../../src/effect/input-command";
import type {BatteryCommand, Command} from "../../../../src";
import type {QuickCommand} from "../../../../src/command/command";

const BATTERY_COMMAND: BatteryCommand = {
  type: 'BATTERY_COMMAND',
  battery: 1
};

const QUICK_COMMAND: QuickCommand = {
  type: 'BURST_COMMAND'
}

test('相手だけがクイックコマンドを使った場合、コマンド選択不可能となる', t => {
  const myCommand: Command = BATTERY_COMMAND;
  const otherCommand: Command = QUICK_COMMAND;
  const result = isNoChoice(myCommand, otherCommand);
  t.true(result);
});

test('自分だけがクイックコマンドを使った場合、コマンド選択可能である', t => {
  const myCommand = QUICK_COMMAND;
  const otherCommand: Command = BATTERY_COMMAND;
  const result = isNoChoice(myCommand, otherCommand);
  t.false(result);
});

test('違いにバッテリーコマンドの場合、操作可能である', t => {
  const myCommand = BATTERY_COMMAND;
  const otherCommand: Command = BATTERY_COMMAND;
  const result = isNoChoice(myCommand, otherCommand);
  t.false(result);
});

test('違いにクイックコマンドの場合、操作可能である', t => {
  const myCommand = QUICK_COMMAND;
  const otherCommand = QUICK_COMMAND;
  const result = isNoChoice(myCommand, otherCommand);
  t.false(result);
});
