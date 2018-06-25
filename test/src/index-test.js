// @flow
import test from 'ava';
import {start} from "../../src/index";
import type {Player} from "../../src/player/player";
import type {GameState} from "../../src/game-state/game-state";
import {progress} from "../../src/progress/index";
import {EMPTY_ARMDOZER} from "../data/empty-armdozer";

const PLAYER1: Player = {
  playerId: 'player1',
  armdozer: {
    ...EMPTY_ARMDOZER,
    speed: 2000
  }
};

const PLAYER2: Player = {
  playerId: 'player2',
  armdozer: {
    ...EMPTY_ARMDOZER,
    speed: 2000
  }
};

test('初期状態を正しく作ることができる', t => {
  const result: GameState[] = start(PLAYER1, PLAYER2);
  t.is(0 < result.length, true);
  t.is(result[0].effect.name, 'InputCommand');
});

test('startで作った初期状態からゲームを進めることができる', t => {
  const initialState = start(PLAYER1, PLAYER2);

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
  const update = progress(initialState[initialState.length - 1], [command1, command2]);
  t.is(0 < update.length, true, '状態更新は1レコード以上ある');
  t.is(update[update.length - 1].effect.name, 'InputCommand', '最後の状態はコマンド入力である');
});