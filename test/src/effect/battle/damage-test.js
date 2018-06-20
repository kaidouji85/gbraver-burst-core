// @flow

import test from 'ava';
import {normalHitDamage} from "../../../../src/effect/battle/damage";
import {createArmdozerState} from "../../../../src/game-state/armdozer-state";
import {EMPTY_ARMDOZER} from "../../../data/empty-armdozer";
import type {BatteryCommand} from "../../../../src/command/battery";
import type {PlayerState} from "../../../../src/game-state/player-state";

const ATTACKER: PlayerState = {
  playerId: 'player1',
  armdozer: createArmdozerState({...EMPTY_ARMDOZER, power: 2000})
};

const DEFENDER: PlayerState = {
  playerId: 'player2',
  armdozer: createArmdozerState({...EMPTY_ARMDOZER})
};

test('ダメージ = 攻撃力 + 100 * (攻撃バッテリ - 防御バッテリ - 1)', t => {
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 5};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};
  t.is(normalHitDamage(ATTACKER, attackerBattery, DEFENDER, defenderBattery), 2200);
});