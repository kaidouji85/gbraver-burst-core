// @flow
import test from 'ava';
import {GbraverBurstCore} from "../../src";
import type {Player} from "../../src/player/player";
import {EMPTY_ARMDOZER} from "../../src/empty/armdozer";
import {EMPTY_PILOT} from "../../src/empty/pilot";

const PLAYER1: Player = {
  playerId: 'player1',
  pilot: EMPTY_PILOT,
  armdozer: {
    ...EMPTY_ARMDOZER,
    speed: 2000
  }
};

const PLAYER2: Player = {
  playerId: 'player2',
  pilot: EMPTY_PILOT,
  armdozer: {
    ...EMPTY_ARMDOZER,
    speed: 2000
  }
};

const COMMAND1 = {
  playerId: 'player1',
  command: {
    type: 'BATTERY_COMMAND',
    battery: 3
  }
};
const COMMAND2 = {
  playerId: 'player2',
  command: {
    type: 'BATTERY_COMMAND',
    battery: 2
  }
};

test('初期状態を正しく作ることができる', t => {
  const core = new GbraverBurstCore([PLAYER1, PLAYER2]);
  const initialState = core.stateHistory();
  t.is(initialState.length, 2);
  t.is(initialState[0].effect.name, 'StartGame');
  t.is(initialState[1].effect.name, 'InputCommand');
});

test('プレイヤー情報が正しくセットされている', t => {
  const core = new GbraverBurstCore([PLAYER1, PLAYER2]);
  const result = core.players();
  const expected = [PLAYER1, PLAYER2];
  t.deepEqual(result, expected);
});

test('正しくゲームを進めることができる', t => {
  const core = new GbraverBurstCore([PLAYER1, PLAYER2]);
  const updated = core.progress([COMMAND1, COMMAND2]);
  t.is(0 < updated.length, true, '状態更新は1レコード以上ある');
  t.is(updated[updated.length - 1].effect.name, 'InputCommand', '最後の状態はコマンド入力である');
});

test('ゲームステート履歴が正しく更新される', t => {
  const core = new GbraverBurstCore([PLAYER1, PLAYER2]);
  const initialState = core.stateHistory();
  const update = core.progress([COMMAND1, COMMAND2]);
  const result = core.stateHistory();
  const expected = [...initialState, ...update];
  t.deepEqual(result, expected);
});
