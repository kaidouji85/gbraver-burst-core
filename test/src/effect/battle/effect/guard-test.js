// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/game-state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import {guard} from "../../../../../src/effect/battle/effect/guard";
import {EMPTY_PLAYER_STATE} from "../../../../data/player";
import type {BatteryCommand} from "../../../../../src/command/battery";

test('攻撃力の半分のダメージが与えられる', t => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'attacker',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      power: 2000,
    }
  };
  const attackerBattery: BatteryCommand = {
    type: 'BATTERY_COMMAND',
    battery: 3
  };
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'defender',
  };
  const defenderBattery: BatteryCommand = {
    type: 'BATTERY_COMMAND',
    battery: 3
  };

  const result = guard(attacker, attackerBattery, defender, defenderBattery);
  t.deepEqual(result, {
    name: 'Guard',
    damage: 1000
  });
});

test('ガードでも攻撃力補正は有効である', t => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'attacker',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      power: 2000,
      effects: [
        {
          type: 'CorrectPower',
          power: 1000
        }
      ]
    }
  };
  const attackerBattery: BatteryCommand = {
    type: 'BATTERY_COMMAND',
    battery: 3
  };
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'defender',
  };
  const defenderBattery: BatteryCommand = {
    type: 'BATTERY_COMMAND',
    battery: 3
  };

  const result = guard(attacker, attackerBattery, defender, defenderBattery);
  t.deepEqual(result, {
    name: 'Guard',
    damage: 1500
  });
});
