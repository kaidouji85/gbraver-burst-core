// @flow

import type {ContinuousActivePlayer, GameState, PlayerState} from "../../../src";
import {continuousActive} from "../../../src/effect/continuous-active";
import {EMPTY_ARMDOZER_STATE} from "../../../src/empty/armdozer";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";

const CONTINUOUS_ACTIVE: ContinuousActivePlayer = {
  type: 'ContinuousActivePlayer',
  period: {type: 'Permanent'},
};

test('アクティブプレイヤー継続が正しく処理できる', () => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'attacker',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 2,
      maxBattery: 5,
      effects: [CONTINUOUS_ACTIVE]
    }
  };
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'defender',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 2,
      maxBattery: 5,
      effects: [CONTINUOUS_ACTIVE]
    }
  }
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId
  };

  const result = continuousActive(lastState);
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
      name: 'TurnChange',
      recoverBattery: 0
    }
  };
  expect(result).toEqual(expected);
});