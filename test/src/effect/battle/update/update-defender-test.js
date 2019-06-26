// @flow

import test from 'ava'
import type {PlayerState} from "../../../../../src/game-state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import {updateDefender} from "../../../../../src/effect/battle/update/update-defender";
import type {Miss} from "../../../../../src/effect/battle/effect/miss";
import type {NormalHit} from "../../../../../src/effect/battle/effect/normal-hit";
import type {Guard} from "../../../../../src/effect/battle/effect/guard";
import type {CriticalHit} from "../../../../../src/effect/battle/effect/critical-hit";
import type {Feint} from "../../../../../src/effect/battle/effect/feint";

const DEFENDER: PlayerState = {
  playerId: 'player1',
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    maxHp: 3000,
    hp: 3000,
    maxBattery: 5,
    battery: 5
  }
};

test('通常ヒットを正しく防御側ステータスに反映できる', t => {
  const command = {
    type: 'BATTERY_COMMAND',
    battery: 3
  };
  const normalHit: NormalHit = {
    name: 'NormalHit',
    damage: 2000
  };
  const result = updateDefender(normalHit, DEFENDER, command);
  t.is(result.armdozer.hp, 1000, 'ダメージの分だけHPが減少している');
  t.is(result.armdozer.battery, 2, '防御に使ったバッテリー分だけバッテリーが減少している');
});

test('クリティカルヒットを正しく防御側ステータスに反映できる', t => {
  const command = {
    type: 'BATTERY_COMMAND',
    battery: 0
  };
  const normalHit: CriticalHit = {
    name: 'CriticalHit',
    damage: 3000
  };
  const result = updateDefender(normalHit, DEFENDER, command);
  t.is(result.armdozer.hp, 0, 'ダメージの分だけHPが減少している');
});

test('防御を正しく防御側ステータスに反映できる', t => {
  const command = {
    type: 'BATTERY_COMMAND',
    battery: 2
  };
  const normalHit: Guard = {
    name: 'Guard',
    damage: 1000
  };
  const result = updateDefender(normalHit, DEFENDER, command);
  t.is(result.armdozer.hp, 2000, 'ダメージの分だけHPが減少している');
  t.is(result.armdozer.battery, 3, '防御に使ったバッテリー分だけバッテリーが減少している');
});

test('ミスを正しく防御側ステータスに反映できる', t => {
  const command = {
    type: 'BATTERY_COMMAND',
    battery: 4
  };
  const normalHit: Miss = {
    name: 'Miss'
  };
  const result = updateDefender(normalHit, DEFENDER, command);
  t.is(result.armdozer.hp, 3000, 'HPは減少していない');
  t.is(result.armdozer.battery, 1, '防御に使ったバッテリー分だけバッテリーが減少している');
});

test('フェイントを正しく防御側ステータスに反映できる', t => {
  const command = {
    type: 'BATTERY_COMMAND',
    battery: 2
  };
  const normalHit: Feint = {
    name: 'Feint',
    isDefenderMoved: true
  };
  const result = updateDefender(normalHit, DEFENDER, command);
  t.is(result.armdozer.hp, 3000, 'HPは減少していない');
  t.is(result.armdozer.battery, 3, '防御に使ったバッテリー分だけバッテリーが減少している');
});
