// @flow

import test from 'ava/index';
import {normalHitDamage} from "../../../../../src/effect/battle/damage/damage";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import type {BatteryCommand} from "../../../../../src/command/battery";
import type {PlayerState} from "../../../../../src/state/player-state";
import {EMPTY_PLAYER_STATE} from "../../../../data/player";
import {EMPTY_CORRECT_POWER} from "../../../../data/amrdozer-effect";

test('ダメージ = 攻撃力  + 攻撃力補正 +　バッテリーボーナス', t => {
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
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 5};
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player2',
  };
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};

  t.is(normalHitDamage(attacker, attackerBattery, defender, defenderBattery), 3200);
});
