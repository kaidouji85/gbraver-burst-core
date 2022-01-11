// @flow

import type {BatteryCommand, BurstCommand, GameState, PlayerState} from "../../../src";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import type {PilotSkillCommand} from "../../../src/command/pilot-skill";
import {progress} from "../../../src/game/progress";

const ATTACKER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'attacker'
};

const DEFENDER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'defender'
};

const BATTERY_COMMAND: BatteryCommand = {
  type: 'BATTERY_COMMAND',
  battery: 1
};

const BURST_COMMAND: BurstCommand = {
  type: 'BURST_COMMAND'
};

const PILOT_SKILL_COMMAND: PilotSkillCommand = {
  type: 'PILOT_SKILL_COMMAND'
};

test('戦闘フローを正しく進めることができる', () => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [DEFENDER, ATTACKER],
    activePlayerId: ATTACKER.playerId
  };
  const commands = [
    {playerId: ATTACKER.playerId, command: BATTERY_COMMAND},
    {playerId: DEFENDER.playerId, command: BATTERY_COMMAND},
  ];

  const result = progress(state, commands);
  expect(result[0].effect.name).toBe('BatteryDeclaration');
  expect(result[1].effect.name).toBe('Battle');
  expect(result[2].effect.name).toBe('RightItself');
  expect(result[3].effect.name).toBe('UpdateRemainingTurn');
  expect(result[4].effect.name).toBe('TurnChange');
  expect(result[5].effect.name).toBe('InputCommand');
});

test('効果適用フローを正しく進めることができる', () => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [DEFENDER, ATTACKER],
    activePlayerId: ATTACKER.playerId
  };
  const commands = [
    {playerId: ATTACKER.playerId, command: BURST_COMMAND},
    {playerId: DEFENDER.playerId, command: PILOT_SKILL_COMMAND},
  ];

  const result = progress(state, commands);
  expect(result.length).toBe(3);
  expect(result[0].effect.name).toBe('BurstEffect');
  expect(result[1].effect.name).toBe('PilotSkillEffect');
  expect(result[2].effect.name).toBe('InputCommand');
});