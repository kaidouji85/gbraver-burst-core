// @flow

import type {PlayerState} from "../../../../src/game/state/player-state";
import type {GameState} from "../../../../src/game/state/game-state";
import test from 'ava';
import {turnChange} from "../../../../src/effect/turn-change";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import type {ContinuousActivePlayer} from "../../../../src/game/state/armdozer-effect";

const CONTINUOUS_ACTIVE: ContinuousActivePlayer = {
  type: 'ContinuousActivePlayer',
  remainingTurn: Infinity,
};

const ATTACKER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'attacker',
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 2,
    maxBattery: 5,
    effects: []
  }
};

const ATTACKER_HAS_CONTINUOUS: PlayerState = {
  ...ATTACKER,
  armdozer: {
    ...ATTACKER.armdozer,
    effects: [CONTINUOUS_ACTIVE]
  }
};

const DEFENDER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'defender',
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 2,
    maxBattery: 5,
    effects: []
  }
};

const DEFENDER_HAS_CONTINUOUS = {
  ...DEFENDER,
  armdozer: {
    ...DEFENDER.armdozer,
    effects: [CONTINUOUS_ACTIVE]
  }
};

test('違いにアクティブ継続がない場合に、防御側のターンとなる', t => {
  const attacker: PlayerState = ATTACKER;
  const defender: PlayerState = DEFENDER;
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId
  };

  const result = turnChange(lastState);
  const expected = {
    ...lastState,
    activePlayerId: defender.playerId,
    players: [
      {
        ...defender,
        armdozer: {
          ...defender.armdozer,
          battery: 5
        }
      },
      attacker
    ],
    effect: {
      name: 'TurnChange'
    }
  };
  t.deepEqual(result, expected);
});

test('攻撃側がアクティブ継続を持つ場合、再び攻撃側のターンとなる', t => {
  const attacker: PlayerState = ATTACKER_HAS_CONTINUOUS;
  const defender: PlayerState = DEFENDER;
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId
  };

  const result = turnChange(lastState);
  const expected = {
    ...lastState,
    activePlayerId: attacker.playerId,
    players: [
      defender,
      {
        ...attacker,
        armdozer: {
          ...attacker.armdozer,
          effects: []
        }
      }
    ],
    effect: {
      name: 'TurnChange'
    }
  };
  t.deepEqual(result, expected);
});

test('防御側のみアクティブ継続を持つ場合、防御側ターンとなる', t => {
  const attacker: PlayerState = ATTACKER;
  const defender: PlayerState = DEFENDER_HAS_CONTINUOUS;
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId
  };

  const result = turnChange(lastState);
  const expected = {
    ...lastState,
    activePlayerId: defender.playerId,
    players: [
      {
        ...defender,
        armdozer: {
          ...defender.armdozer,
          battery: 5
        }
      },
      attacker
    ],
    effect: {
      name: 'TurnChange'
    }
  };
  t.deepEqual(result, expected);
});

test('攻撃、防御両方がアクティブ継続を持つ場合、攻撃側のターンとなる', t => {
  const attacker: PlayerState = ATTACKER_HAS_CONTINUOUS;
  const defender: PlayerState = DEFENDER_HAS_CONTINUOUS;
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId
  };

  const result = turnChange(lastState);
  const expected = {
    ...lastState,
    activePlayerId: attacker.playerId,
    players: [
      defender,
      {
        ...attacker,
        armdozer: {
          ...attacker.armdozer,
          effects: []
        }
      }
    ],
    effect: {
      name: 'TurnChange'
    }
  };
  t.deepEqual(result, expected);
});