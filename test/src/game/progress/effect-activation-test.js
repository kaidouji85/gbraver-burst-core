// @flow

import test from 'ava';
import type {BatteryCommand, BurstCommand, GameState, PlayerState} from "../../../../src";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import type {PilotSkillCommand} from "../../../../src/command/pilot-skill";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import {progress} from "../../../../src";

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

test('一人だけ効果適用する場合でも正しく処理される', t => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [DEFENDER, ATTACKER],
    activePlayerId: ATTACKER.playerId
  };
  const commands = [
    {playerId: ATTACKER.playerId, command: BURST_COMMAND},
    {playerId: DEFENDER.playerId, command: BATTERY_COMMAND},
  ];

  const result = progress(state, commands);
  t.is(result.length, 2);
  t.is(result[0].effect.name, 'BurstEffect');
  t.is(result[1].effect.name, 'InputCommand');
});

test('二人とも効果適用する場合でも正しく処理される', t => {
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
  t.is(result.length, 3);
  t.is(result[0].effect.name, 'BurstEffect');
  t.is(result[1].effect.name, 'PilotSkillEffect');
  t.is(result[2].effect.name, 'InputCommand');
});