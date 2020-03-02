// @flow

import test from 'ava';
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import {batteryDeclaration} from "../../../../src/effect/battery-declaration";

test('バッテリー宣言が正しく処理される', t => {
  const attacker = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'attacker',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 4,
      maxBattery: 5,
    }
  };
  const defender = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'defender',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 5,
      maxBattery: 5,
    }
  };
  const lastState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: 'attacker',
    players: [attacker, defender]
  };
  const commands = [
    {
      playerId: 'attacker',
      command: {
        type: 'BATTERY_COMMAND',
        battery: 3
      }
    },
    {
      playerId: 'defender',
      command: {
        type: 'BATTERY_COMMAND',
        battery: 2
      }
    },
  ];

  const result = batteryDeclaration(lastState, commands);
  const expected = {
    ...lastState,
    players: [
      {
        ...attacker,
        armdozer: {
          ...attacker.armdozer,
          battery: 1
        }
      },
      {
        ...defender,
        armdozer: {
          ...defender.armdozer,
          battery: 3
        }
      },
    ],
    effect: {
      name: 'BatteryDeclaration',
      attacker: 'attacker',
      attackerBattery: 3,
      defenderBattery: 2,
    }
  };
  t.deepEqual(result, expected);
});