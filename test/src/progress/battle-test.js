// @flow

import test from 'ava';
import type {PlayerState} from "../../../src/game-state/player-state";
import {EMPTY_PLAYER_STATE} from "../../data/player";
import {EMPTY_ARMDOZER_STATE} from "../../data/armdozer";
import type {GameState} from "../../../src/game-state/game-state";
import {EMPTY_GAME_STATE} from "../../data/game-state";
import type {PlayerCommand} from "../../../src/command/player-command";
import {progress} from "../../../src/progress";

test('戦闘フローを正常に進められる', t => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'attacker',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: 3000,
      maxHp: 3000,
      power: 2000,
      battery: 4,
      maxBattery: 5
    }
  };
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'defender',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: 3000,
      maxHp: 3000,
      power: 2000,
      battery: 5,
      maxBattery: 5
    }
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: 'attacker',
    players: [attacker, defender]
  };
  const commands: PlayerCommand[] = [{
    playerId: 'attacker',
    command: {type: 'BATTERY_COMMAND', battery: 2}
  }, {
    playerId: 'defender',
    command: {type: 'BATTERY_COMMAND', battery: 1}
  }];

  const result = progress(lastState, commands);
  t.is(result.length, 3);
  t.is(result[0].effect.name, 'Battle');
  t.is(result[1].effect.name, 'TurnChange');
  t.is(result[2].effect.name, 'InputCommand');
});
