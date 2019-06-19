// @flow

import test from 'ava'
import {updateAttacker} from "../../../../../src/effect/battle/update/update-attacker";
import type {PlayerState} from "../../../../../src/game-state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import type {BatteryCommand} from "../../../../../src/command/battery";

const ATTACKER: PlayerState = {
  playerId: 'player1',
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    maxBattery: 5,
    battery: 5
  }
};

const COMMAND: BatteryCommand = {
  type: 'BATTERY_COMMAND',
  battery: 3
};

test('攻撃に使ったバッテリーが引かれている', t => {
  const result = updateAttacker(ATTACKER, COMMAND);
  t.is(result.armdozer.battery, 2);
});
