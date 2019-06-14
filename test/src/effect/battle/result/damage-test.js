// @flow

import test from 'ava';
import {normalHitDamage} from "../../../../../src/effect/battle/result/damage";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import type {BatteryCommand} from "../../../../../src/command/battery";
import type {PlayerState} from "../../../../../src/game-state/player-state";

const ATTACKER: PlayerState = {
  playerId: 'player1',
  armdozer: {...EMPTY_ARMDOZER_STATE, power: 2000}
};

const DEFENDER: PlayerState = {
  playerId: 'player2',
  armdozer: {...EMPTY_ARMDOZER_STATE}
};

test('ダメージ = 攻撃力 + 100 * (攻撃バッテリ - 防御バッテリ - 1)', t => {
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 5};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};
  t.is(normalHitDamage(ATTACKER, attackerBattery, DEFENDER, defenderBattery), 2200);
});