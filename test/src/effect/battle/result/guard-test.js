// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import {guard} from "../../../../../src/effect/battle/result/guard";
import {EMPTY_PLAYER_STATE} from "../../../../data/player";
import type {BatteryCommand} from "../../../../../src/command/battery";

test('通常ヒットの半分のダメージを受ける', t => {
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
