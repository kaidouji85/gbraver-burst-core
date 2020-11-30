// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import type {BatteryCommand} from "../../../../../src/command/battery";
import {criticalHit} from "../../../../../src/effect/battle/result/critical-hit";
import {EMPTY_PLAYER_STATE} from "../../../../data/player";

test('クリティカルヒットが正しく計算できる', t => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player1',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE, power: 2000,
      effects: [
        {type: 'CorrectPower', power: 600, remainingTurn: 2}
      ]
    }
  };
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player2',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      effects: [
        {type: "DamageDecrease", decrease: 600, remainingTurn: 2}
      ]
    }
  };
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 0};
  const result = criticalHit(attacker, attackerBattery, defender, defenderBattery);
  t.deepEqual(result, {
    name: 'CriticalHit',
    damage: 4800
  });
});
