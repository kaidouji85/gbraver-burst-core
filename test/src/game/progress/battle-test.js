// @flow

import test from 'ava';
import type {PlayerState} from "../../../../src/state/player-state";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import type {GameState} from "../../../../src/state/game-state";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import type {PlayerCommand} from "../../../../src/player/command/player-command";
import {progress} from "../../../../src/game/progress";

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
  t.is(result.length, 4);
  t.is(result[0].effect.name, 'BatteryDeclaration');
  t.is(result[1].effect.name, 'Battle');
  t.is(result[2].effect.name, 'TurnChange');
  t.is(result[3].effect.name, 'InputCommand');
});

test('攻撃で防御側のHPを0以下にした場合、ゲームが終了する', t => {
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
      hp: 100,
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
  t.is(result[0].effect.name, 'BatteryDeclaration');
  t.is(result[1].effect.name, 'Battle');
  t.is(result[2].effect.name, 'GameEnd');
  t.deepEqual(result[2].effect, {
    name: 'GameEnd',
    result: {
      type: 'GameOver',
      winner: 'attacker'
    }
  });
});

test('ダメージ反射でHPが0になった場合は引き分け', t => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'attacker',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: 3000,
      maxHp: 3000,
      power: 2000,
      battery: 4,
      maxBattery: 5,
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
      maxBattery: 5,
      effects: [
        {
          type: 'TryReflect',
          damage: 5000,
          effect: 'Lightning'
        }
      ]
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
    command: {type: 'BATTERY_COMMAND', battery: 0}
  }];

  const result = progress(lastState, commands);
  t.is(result.length, 4);
  t.is(result[0].effect.name, 'BatteryDeclaration');
  t.is(result[1].effect.name, 'Battle');
  t.is(result[2].effect.name, 'Reflect');
  t.deepEqual(result[3].effect, {
    name: 'GameEnd',
    result: {
      type: 'EvenMatch',
    }
  });
});