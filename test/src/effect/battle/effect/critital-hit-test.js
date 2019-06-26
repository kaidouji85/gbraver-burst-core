// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/game-state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import type {BatteryCommand} from "../../../../../src/command/battery";
import {criticalHit} from "../../../../../src/effect/battle/effect/critical-hit";

const ATTACKER: PlayerState = {
  playerId: 'player1',
  armdozer: {...EMPTY_ARMDOZER_STATE, power: 2000}
};

const DEFENDER: PlayerState = {
  playerId: 'player2',
  armdozer: {...EMPTY_ARMDOZER_STATE}
};

test('クリティカルヒットなので、ダメージ計算式の2倍のダメージが与えられる', t => {
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 3};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};
  const result = criticalHit(ATTACKER, attackerBattery, DEFENDER, defenderBattery);
  t.is(result.damage, 4000);
});
