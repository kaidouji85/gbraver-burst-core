// @flow

import test from 'ava';
import type {Player} from "../../../src/player/player";
import {EMPTY_ARMDOZER} from "../../../src/empty/armdozer";
import {startGame} from "../../../src/effect/start-game";
import type {GameState} from "../../../src/state/game-state";
import {EMPTY_PILOT} from "../../../src/empty/pilot";

const PLAYER1: Player = {
  playerId: 'player01',
  armdozer: {
    ...EMPTY_ARMDOZER,
    maxHp: 3000,
    maxBattery: 5,
    speed: 2000
  },
  pilot: EMPTY_PILOT,
};

const PLAYER2: Player = {
  playerId: 'playert02',
  armdozer: {
    ...EMPTY_ARMDOZER,
    maxHp: 3500,
    maxBattery: 5,
    speed: 1000
  },
  pilot: EMPTY_PILOT,
};

test('正しくゲームスタートができる', t => {
  const result = startGame(PLAYER1, PLAYER2);
  const expected: GameState = {
    players: [
      {
        ...PLAYER1,
        armdozer: {
          ...PLAYER1.armdozer,
          hp: 3000,
          battery: 5,
          enableBurst: true,
          effects: [],
        },
        pilot: {
          ...PLAYER1.pilot,
          enableSkill: true
        }
      }, {
        ...PLAYER2,
        armdozer: {
          ...PLAYER2.armdozer,
          hp: 3500,
          battery: 5,
          enableBurst: true,
          effects: [],
        },
        pilot: {
          ...PLAYER2.pilot,
          enableSkill: true
        }
      }
    ],
    effect: {
      name: 'StartGame'
    },
    activePlayerId: 'player01'
  };
  t.deepEqual(result, expected);
});
