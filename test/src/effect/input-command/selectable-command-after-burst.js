// @flow

import test from 'ava';
import {selectableCommandAfterBurst} from "../../../../src/effect/input-command/selectable-command-after-burst";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_ARMDOZER} from "../../../data/armdozer";

test('自分がバーストした場合、バッテリー選択ができる', t => {
  const player = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_ARMDOZER,
      battery: 4,
      maxBattery: 5,
    }
  };
  const command = {type: 'BURST_COMMAND'};
  const result = selectableCommandAfterBurst(player, command);
  t.deepEqual(result, [
    {type: 'BATTERY_COMMAND', battery: 0},
    {type: 'BATTERY_COMMAND', battery: 1},
    {type: 'BATTERY_COMMAND', battery: 2},
    {type: 'BATTERY_COMMAND', battery: 3},
    {type: 'BATTERY_COMMAND', battery: 4},
  ]);
});

test('自分がバーストしていない場合、前回選択したコマンドした選べない', t => {
  const player = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_ARMDOZER,
      battery: 4,
      maxBattery: 5,
    }
  };
  const command = {type: 'BATTERY_COMMAND', battery: 3};
  const result = selectableCommandAfterBurst(player, command);
  t.deepEqual(result, [command]);
});
