// @flow

import type {PlayerState} from "../../../src/state/player-state";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import {EMPTY_ARMDOZER_STATE} from "../../../src/empty/armdozer";
import type {GameState} from "../../../src/state/game-state";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {battleFlow} from "../../../src/game/progress/battle-flow";

test('戦闘フローを正常に進められる', () => {
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
  const commands = [{
    playerId: 'attacker',
    command: {type: 'BATTERY_COMMAND', battery: 2}
  }, {
    playerId: 'defender',
    command: {type: 'BATTERY_COMMAND', battery: 1}
  }];

  const result = battleFlow(lastState, commands);
  expect(result.length).toBe(6);
  expect(result[0].effect.name).toBe('BatteryDeclaration');
  expect(result[1].effect.name).toBe('Battle');
  expect(result[2].effect.name).toBe('RightItself');
  expect(result[3].effect.name).toBe('UpdateRemainingTurn');
  expect(result[4].effect.name).toBe('TurnChange');
  expect(result[5].effect.name).toBe('InputCommand');
});

test('攻撃で防御側のHPを0以下にした場合、ゲームが終了する', () => {
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
  const commands = [{
    playerId: 'attacker',
    command: {type: 'BATTERY_COMMAND', battery: 2}
  }, {
    playerId: 'defender',
    command: {type: 'BATTERY_COMMAND', battery: 1}
  }];

  const result = battleFlow(lastState, commands);
  expect(result.length).toBe(3);
  expect(result[0].effect.name).toBe('BatteryDeclaration');
  expect(result[1].effect.name).toBe('Battle');
  expect(result[2].effect).toEqual({
    name: 'GameEnd',
    result: {
      type: 'GameOver',
      winner: 'attacker'
    }
  });
});

test('ダメージ反射でHPが0になった場合は引き分け', () => {
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
          effect: 'Lightning',
          period: {
            type: 'TurnLimit',
            remainingTurn: 1,
          }
        }
      ]
    }
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: 'attacker',
    players: [attacker, defender]
  };
  const commands = [{
    playerId: 'attacker',
    command: {type: 'BATTERY_COMMAND', battery: 2}
  }, {
    playerId: 'defender',
    command: {type: 'BATTERY_COMMAND', battery: 0}
  }];

  const result = battleFlow(lastState, commands);
  expect(result.length).toBe(4);
  expect(result[0].effect.name).toBe('BatteryDeclaration');
  expect(result[1].effect.name).toBe('Battle');
  expect(result[2].effect.name).toBe('Reflect');
  expect(result[3].effect).toEqual({
    name: 'GameEnd',
    result: {
      type: 'EvenMatch',
    }
  });
});