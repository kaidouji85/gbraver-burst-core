// @flow

import test from 'ava';
import {isBurstFlow} from "../../../../src/game/progress/burst-flow";

test('1人のプレイヤーがバーストを選択した場合、バーストフェイズが実施される', t => {
  const result = isBurstFlow([
    {
      playerId: 'player01',
      command: {
        type: 'BURST_COMMAND',
      }
    }, {
      playerId: 'player02',
      command: {
        type: 'BATTERY_COMMAND',
        battery: 2
      }
    }
  ]);
  t.true(result);
});

test('2人ともバーストを選択した場合、バーストフェイズが実施される', t => {
  const result = isBurstFlow([
    {
      playerId: 'player01',
      command: {
        type: 'BURST_COMMAND',
      }
    }, {
      playerId: 'player02',
      command: {
        type: 'BURST_COMMAND',
      }
    }
  ]);
  t.true(result);
});

test('2人ともバッテリーを選択した場合、バーストフェイズが実施されない', t => {
  const result = isBurstFlow([
    {
      playerId: 'player01',
      command: {
        type: 'BATTERY_COMMAND',
        battery: 3,
      }
    }, {
      playerId: 'player02',
      command: {
        type: 'BATTERY_COMMAND',
        battery: 2
      }
    }
  ]);
  t.false(result);
});
