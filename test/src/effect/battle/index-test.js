// @flow

import test from 'ava';
import type {InputCommand} from "../../../../src/effect/input-command/input-command";
import type {GameState} from "../../../../src/game-state/game-state";
import type {PlayerCommand} from "../../../../src/command/player-command";
import {battle} from "../../../../src/effect/battle";
import type {PlayerState} from "../../../../src/game-state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../data/empty-armdozer";

const ATTACKER: PlayerState = {
  playerId: 'player1',
  armdozer: {...EMPTY_ARMDOZER_STATE, power: 2000}
};

const DEFENDER: PlayerState = {
  playerId: 'player2',
  armdozer: {...EMPTY_ARMDOZER_STATE}
};

const INPUT_COMMAND: InputCommand = {
  name: 'InputCommand',
  players: [
    {
      playerId: 'player1',
      command: new Array(6).map((_, index) => ({
        type: 'BATTERY_COMMAND', battery: index
      }))
    },
    {
      playerId: 'player2',
      command: new Array(6).map((_, index) => ({
        type: 'BATTERY_COMMAND', battery: index
      }))
    }
  ]
};

const LAST_GAME_STATE: GameState = {
  players: [ATTACKER, DEFENDER],
  activePlayerId: 'player1',
  effect: INPUT_COMMAND,
};

test('戦闘を実行した後の状態に正しく更新できる', t => {
  const playerCommands: PlayerCommand[] = [
    {
      playerId: 'player1',
      command: {
        type: 'BATTERY_COMMAND',
        battery: 3
      }
    }, {
      playerId: 'player2',
      command: {
        type: 'BATTERY_COMMAND',
        battery: 2
      }
    }
  ];

  const result = battle(LAST_GAME_STATE, playerCommands);
  t.is(result.effect.name, 'Battle', '戦闘結果を返す');
  t.true(result.players[1].armdozer.hp < LAST_GAME_STATE.players[1].armdozer.hp, '防御側HPが減っている');
});