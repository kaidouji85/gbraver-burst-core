// @flow

import test from 'ava';
import type {Player} from "../../../src/player/player";
import {EMPTY_ARMDOZER} from "../../data/armdozer";
import type {GameState} from "../../../src/state/game-state";
import {EMPTY_GAME_STATE} from "../../data/game-state";
import {progress} from "../../../src/game/progress";
import type {PlayerCommand} from "../../../src/player/command/player-command";

const attacker: Player = {
  playerId: 'attacker',
  armdozer: {
    ...EMPTY_ARMDOZER,
    battery: 2,
    maxBattery: 5,
    enableBurst: true,
    burst: {
      type: 'RecoverBattery',
      recoverBattery: 5
    }
  }
};

const defender: Player = {
  playerId: 'defender',
  armdozer: {
    ...EMPTY_ARMDOZER,
    battery: 3,
    maxBattery: 5,
    enableBurst: true,
    burst: {
      type: 'RecoverBattery',
      recoverBattery: 5
    }
  },
};

test('攻撃側:バースト、防御側:バッテリー のケースが正しく適用される', t => {
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [attacker, defender],
    activePlayerId: 'attacker',
  };
  const commands: PlayerCommand[] = [{
    playerId: 'attacker',
    command: {type: 'BURST_COMMAND'}
  }, {
    playerId: 'defender',
    command: {type: 'BATTERY_COMMAND', battery: 2}
  }];

  const result = progress(lastState, commands);
  t.is(result.length, 2);
  t.true(result[0].effect.name === 'BurstEffect' && result[0].effect.burstPlayer === 'attacker');
  t.is(result[1].effect.name, 'InputCommand');
});

test('攻撃側:バッテリー、防御側:バースト のケースが正しく適用される', t => {
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [attacker, defender],
    activePlayerId: 'attacker',
  };
  const commands: PlayerCommand[] = [{
    playerId: 'attacker',
    command: {type: 'BATTERY_COMMAND', battery: 2}
  }, {
    playerId: 'defender',
    command: {type: 'BURST_COMMAND'}
  }];

  const result = progress(lastState, commands);
  t.is(result.length, 2);
  t.true(result[0].effect.name === 'BurstEffect' && result[0].effect.burstPlayer === 'defender');
  t.is(result[1].effect.name, 'InputCommand');
});

test('攻撃側:バースト、防御側:バースト のケースが正しく適用される', t => {
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [attacker, defender],
    activePlayerId: 'attacker',
  };
  const commands: PlayerCommand[] = [{
    playerId: 'attacker',
    command: {type: 'BURST_COMMAND'}
  }, {
    playerId: 'defender',
    command: {type: 'BURST_COMMAND'}
  }];

  const result = progress(lastState, commands);
  t.is(result.length, 3);
  t.true(result[0].effect.name === 'BurstEffect' && result[0].effect.burstPlayer === 'attacker');
  t.true(result[1].effect.name === 'BurstEffect' && result[1].effect.burstPlayer === 'defender');
  t.is(result[2].effect.name, 'InputCommand');
});
