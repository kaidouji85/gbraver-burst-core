// @flow

import test from 'ava';
import type {BatteryCommand, BurstCommand, GameState, PlayerCommand, PlayerState} from "../../../src";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import type {PilotSkillCommand} from "../../../src/command/pilot-skill";
import {activationOrNot} from "../../../src/game/progress/effect-activation-flow";

const BURST_COMMAND: BurstCommand = {
  type: 'BURST_COMMAND',
};

const BATTERY_COMMAND: BatteryCommand = {
  type: 'BATTERY_COMMAND',
  battery: 2
};

const PILOT_SKILL_COMMAND: PilotSkillCommand = {
  type: 'PILOT_SKILL_COMMAND'
};

const TEST_PLAYER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'test'
};

const OTHER_PLAYER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'other'
};

test('バッテリーコマンドの場合は何もしない', t => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [OTHER_PLAYER, TEST_PLAYER]
  };
  const command: PlayerCommand = {
    playerId: TEST_PLAYER.playerId,
    command: BATTERY_COMMAND
  };

  const result = activationOrNot(state, command);
  t.is(result, null);
});

test('バーストコマンドの場合は、バーストを発動する', t => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [OTHER_PLAYER, TEST_PLAYER]
  };
  const command: PlayerCommand = {
    playerId: TEST_PLAYER.playerId,
    command:  BURST_COMMAND
  };

  const result = activationOrNot(state, command);
  t.true(result && result.effect.name === 'BurstEffect');
});

test('パイロットスキルコマンドの場合は、パイロットスキルを発動する', t => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [OTHER_PLAYER, TEST_PLAYER]
  };
  const command: PlayerCommand = {
    playerId: TEST_PLAYER.playerId,
    command:  PILOT_SKILL_COMMAND
  };

  const result = activationOrNot(state, command);
  t.true(result && result.effect.name === 'PilotSkillEffect')
});