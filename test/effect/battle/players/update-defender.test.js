// @flow

import {updateDefender} from "../../../../src/effect/battle/players/update-defender";
import type {CriticalHit} from "../../../../src/effect/battle/result/critical-hit";
import type {Feint} from "../../../../src/effect/battle/result/feint";
import type {Guard} from "../../../../src/effect/battle/result/guard";
import type {Miss} from "../../../../src/effect/battle/result/miss";
import type {NormalHit} from "../../../../src/effect/battle/result/normal-hit";
import {EMPTY_ARMDOZER_STATE} from "../../../../src/empty/armdozer";
import {EMPTY_PLAYER_STATE} from "../../../../src/empty/player";
import type {PlayerState} from "../../../../src/state/player-state";

const DEFENDER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'player1',
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    maxHp: 3000,
    hp: 3000,
    maxBattery: 5,
    battery: 5
  }
};

test('通常ヒットを正しく防御側ステータスに反映できる', () => {
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
  expect(result).toEqual(expected);
});

test('クリティカルヒットを正しく防御側ステータスに反映できる', () => {
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
  expect(result).toEqual(expected);
});

test('防御を正しく防御側ステータスに反映できる', () => {
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
  expect(result).toEqual(expected);
});

test('ミスを正しく防御側ステータスに反映できる', () => {
  const normalHit: Miss = {
    name: 'Miss'
  };
  const result = updateDefender(normalHit, DEFENDER);
  const expected = DEFENDER;
  expect(result).toEqual(expected);
});

test('フェイントを正しく防御側ステータスに反映できる', () => {
  const normalHit: Feint = {
    name: 'Feint',
    isDefenderMoved: true
  };
  const result = updateDefender(normalHit, DEFENDER);
  const expected = DEFENDER;
  expect(result).toEqual(expected);
});
