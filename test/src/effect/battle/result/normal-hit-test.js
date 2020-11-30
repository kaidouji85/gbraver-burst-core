// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import type {BatteryCommand} from "../../../../../src/command/battery";
import {normalHit} from "../../../../../src/effect/battle/result/normal-hit";
import {EMPTY_CORRECT_POWER, EMPTY_DAMAGE_DECREASE} from "../../../../data/amrdozer-effect";
import {EMPTY_PLAYER_STATE} from "../../../../data/player";

test('通常ヒットのダメージ計算が正しい', t => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
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
    ...EMPTY_PLAYER_STATE,
    playerId: 'player2',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      effects: [
        {...EMPTY_DAMAGE_DECREASE, decrease: 600}
      ]
    }
  };
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 5};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};
  const result = normalHit(attacker, attackerBattery, defender, defenderBattery);
  t.deepEqual(result, {
    name: 'NormalHit',
    damage: 2600
  });
});
