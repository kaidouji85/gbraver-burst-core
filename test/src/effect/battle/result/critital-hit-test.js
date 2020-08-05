// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/game/state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import type {BatteryCommand} from "../../../../../src/command/battery";
import {criticalHit} from "../../../../../src/effect/battle/result/critical-hit";
import {EMPTY_PLAYER_STATE} from "../../../../data/player";

test('クリティカルヒットなので、ダメージ計算式の2倍のダメージが与えられる', t => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player1',
    armdozer: {...EMPTY_ARMDOZER_STATE, power: 2000}
  };
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player2',
    armdozer: {...EMPTY_ARMDOZER_STATE}
  };
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 0};
  const result = criticalHit(attacker, attackerBattery, defender, defenderBattery);
  t.deepEqual(result, {
    name: 'CriticalHit',
    damage: 4200
  });
});
