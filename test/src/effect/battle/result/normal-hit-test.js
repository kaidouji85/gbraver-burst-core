// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/game-state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import type {BatteryCommand} from "../../../../../src/command/battery";
import {normalHit} from "../../../../../src/effect/battle/result/normal-hit";
import {EMPTY_CORRECT_POWER} from "../../../../data/amrdozer-effect";

test('通常ヒットなので、ダメージ計算式通りのダメージが与えられる', t => {
  const attacker: PlayerState = {
    playerId: 'player1',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      power: 2000,
      effects: [
        {...EMPTY_CORRECT_POWER, power: 1000}
      ]
    }
  };

  const defender: PlayerState = {
    playerId: 'player2',
    armdozer: {...EMPTY_ARMDOZER_STATE}
  };
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 5};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};
  const result = normalHit(attacker, attackerBattery, defender, defenderBattery);
  t.deepEqual(result, {
    name: 'NormalHit',
    damage: 3200
  });
});
