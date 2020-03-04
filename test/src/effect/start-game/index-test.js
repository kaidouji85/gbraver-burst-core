import test from 'ava';
import type {Player} from "../../../../src/player/player";
import {EMPTY_ARMDOZER} from "../../../data/armdozer";
import {startGame} from "../../../../src/effect/start-game";
import {GameState} from "../../../../src/state/game-state";

const PLAYER1: Player = {
  playerId: 'player01',
  armdozer: {
    ...EMPTY_ARMDOZER,
    maxHp: 3000,
    maxBattery: 5,
    speed: 2000
  }
};

const PLAYER2: Player = {
  playerId: 'playert02',
  armdozer: {
    ...EMPTY_ARMDOZER,
    maxHp: 3500,
    maxBattery: 5,
    speed: 1000
  }
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
        }
      }, {
        ...PLAYER2,
        armdozer: {
          ...PLAYER2.armdozer,
          hp: 3500,
          battery: 5,
          enableBurst: true,
          effects: [],
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
