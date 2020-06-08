// @flow

import test from 'ava'
import type {PlayerState} from "../../../../../src/game/state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import {updateDefender} from "../../../../../src/effect/battle/players/update-defender";
import type {Miss} from "../../../../../src/effect/battle/result/miss";
import type {NormalHit} from "../../../../../src/effect/battle/result/normal-hit";
import type {Guard} from "../../../../../src/effect/battle/result/guard";
import type {CriticalHit} from "../../../../../src/effect/battle/result/critical-hit";
import type {Feint} from "../../../../../src/effect/battle/result/feint";

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
  const normalHit: NormalHit = {
    name: 'NormalHit',
    damage: 2000
  };

  const result = updateDefender(normalHit, DEFENDER);
  const expected = {
    ...DEFENDER,
    armdozer: {
      ...DEFENDER.armdozer,
      hp: 1000
    }
  };
  t.deepEqual(result, expected);
});

test('クリティカルヒットを正しく防御側ステータスに反映できる', t => {
  const normalHit: CriticalHit = {
    name: 'CriticalHit',
    damage: 3000
  };
  const result = updateDefender(normalHit, DEFENDER);
  const expected = {
    ...DEFENDER,
    armdozer: {
      ...DEFENDER.armdozer,
      hp: 0
    }
  };
  t.deepEqual(result, expected);
});

test('防御を正しく防御側ステータスに反映できる', t => {
  const normalHit: Guard = {
    name: 'Guard',
    damage: 1000
  };
  const result = updateDefender(normalHit, DEFENDER);
  const expected = {
    ...DEFENDER,
    armdozer: {
      ...DEFENDER.armdozer,
      hp: 2000
    }
  };
  t.deepEqual(result, expected);
});

test('ミスを正しく防御側ステータスに反映できる', t => {
  const normalHit: Miss = {
    name: 'Miss'
  };
  const result = updateDefender(normalHit, DEFENDER);
  const expected = DEFENDER;
  t.deepEqual(result, expected);
});

test('フェイントを正しく防御側ステータスに反映できる', t => {
  const normalHit: Feint = {
    name: 'Feint',
    isDefenderMoved: true
  };
  const result = updateDefender(normalHit, DEFENDER);
  const expected = DEFENDER;
  t.deepEqual(result, expected);
});
