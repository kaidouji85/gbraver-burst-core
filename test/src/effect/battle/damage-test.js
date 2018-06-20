// @flow

import test from 'ava';
import {normalHitDamage} from "../../../../src/effect/battle/damage";
import {createArmdozerState} from "../../../../src/game-state/armdozer-state";
import {EMPTY_ARMDOZER} from "../../../data/empty-armdozer";
import type {BatteryCommand} from "../../../../src/command/battery";
import type {PlayerState} from "../../../../src/game-state/player-state";

test('攻撃バッテリ - 防御バッテリ = 1 なら ダメージ = 攻撃力', t => {
  const attacker: PlayerState = {
    playerId: 'player1',
    armdozer: createArmdozerState({...EMPTY_ARMDOZER, power: 2000})
  };
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 3};
  const defender = {
    playerId: 'player2',
    armdozer: createArmdozerState({...EMPTY_ARMDOZER})
  };
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};

  t.is(normalHitDamage(attacker, attackerBattery, defender, defenderBattery), 2000);
});

test('攻撃バッテリ - 防御バッテリ >= 2 なら ダメージ = 攻撃力 + 100 * (攻撃バッテリ - 防御バッテリ - 1)', t => {
  const attacker: PlayerState = {
    playerId: 'player1',
    armdozer: createArmdozerState({...EMPTY_ARMDOZER, power: 2000})
  };
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 5};
  const defender = {
    playerId: 'player2',
    armdozer: createArmdozerState({...EMPTY_ARMDOZER})
  };
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};

  t.is(normalHitDamage(attacker, attackerBattery, defender, defenderBattery), 2200);
});