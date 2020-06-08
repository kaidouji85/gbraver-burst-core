// @flow

import test from 'ava';
import {isNoChoice} from "../../../../src/effect/input-command";
import type {Command, PlayerState} from "../../../../src";
import {EMPTY_PLAYER_STATE} from "../../../data/player";

test('相手だけがバーストを使った場合、コマンド選択不可能となる', t => {
  const myCommand: Command = {
    type: 'BATTERY_COMMAND',
    battery: 1
  };
  const otherCommand: Command = {
    type: 'BURST_COMMAND'
  }
  const other: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      burst: {
        type: 'RecoverBattery',
        recoverBattery: 3
      }
    }
  };
  const result = isNoChoice(myCommand, otherCommand, other);
  t.true(result);
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
  const other: PlayerState = EMPTY_PLAYER_STATE;
  const result = isNoChoice(myCommand, otherCommand, other);
  t.false(result);
});

test('違いにバーストコマンドの場合、操作可能である', t => {
  const myCommand: Command = {
    type: 'BURST_COMMAND',
  };
  const otherCommand: Command = {
    type: 'BURST_COMMAND',
  }
  const other: PlayerState = EMPTY_PLAYER_STATE;
  const result = isNoChoice(myCommand, otherCommand, other);
  t.false(result);
});

test('相手がスキップターンした場合、操作可能である', t => {
  const myCommand: Command = {
    type: 'BATTERY_COMMAND',
    battery: 1
  };
  const otherCommand: Command = {
    type: 'BURST_COMMAND'
  }
  const other: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      burst: {
        type: 'SkipTurn',
        recoverBattery: 3
      }
    }
  };
  const result = isNoChoice(myCommand, otherCommand, other);
  t.false(result);
});
