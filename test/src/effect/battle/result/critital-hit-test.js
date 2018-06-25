// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/game-state/player-state";
import {createArmdozerState} from "../../../../../src/game-state/armdozer-state";
import {EMPTY_ARMDOZER} from "../../../../data/empty-armdozer";
import type {BatteryCommand} from "../../../../../src/command/battery";
import {criticalHit} from "../../../../../src/effect/battle/result/critical-hit";

const ATTACKER: PlayerState = {
  playerId: 'player1',
  armdozer: createArmdozerState({...EMPTY_ARMDOZER, power: 2000})
};

const DEFENDER: PlayerState = {
  playerId: 'player2',
  armdozer: createArmdozerState({...EMPTY_ARMDOZER})
};

test('クリティカルヒットなので、ダメージ計算式の2倍のダメージが与えられる', t => {
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 3};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};
  const result = criticalHit(ATTACKER, attackerBattery, DEFENDER, defenderBattery);
  t.is(result.damage, 4000);
});