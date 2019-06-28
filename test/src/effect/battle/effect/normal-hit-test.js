// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/game-state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import type {BatteryCommand} from "../../../../../src/command/battery";
import {normalHit} from "../../../../../src/effect/battle/result/normal-hit";

const ATTACKER: PlayerState = {
  playerId: 'player1',
  armdozer: {...EMPTY_ARMDOZER_STATE, power: 2000}
};

const DEFENDER: PlayerState = {
  playerId: 'player2',
  armdozer: {...EMPTY_ARMDOZER_STATE}
};

test('通常ヒットなので、ダメージ計算式通りのダメージが与えられる', t => {
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 3};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};
  const result = normalHit(ATTACKER, attackerBattery, DEFENDER, defenderBattery);
  t.is(result.damage, 2000);
});
