// @flow
import test from 'ava';
import {GbraverBurstCore} from "../../../src";
import type {Player} from "../../../src/player/player";
import {EMPTY_ARMDOZER} from "../../data/armdozer";
import {EMPTY_PILOT} from "../../data/pilot";

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

test('ゲームを正しく進めることができる', t => {
  const core = new GbraverBurstCore([PLAYER1, PLAYER2]);
  const command1 = {
    playerId: 'player1',
    command: {
      type: 'BATTERY_COMMAND',
      battery: 3
    }
  };
  const command2 = {
    playerId: 'player2',
    command: {
      type: 'BATTERY_COMMAND',
      battery: 2
    }
  };
  const update = core.progress([command1, command2]);
  t.is(0 < update.length, true, '状態更新は1レコード以上ある');
  t.is(update[update.length - 1].effect.name, 'InputCommand', '最後の状態はコマンド入力である');
});
