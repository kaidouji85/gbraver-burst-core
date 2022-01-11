// @flow

import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import type {Battle, GameState} from "../../../src";
import {rightItself} from "../../../src/effect/right-itself";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";

test('防御側体勢整え効果が正しく適用できる', () => {
  const attacker = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'attacker'
  };
  const defender = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'defender'
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: attacker.playerId,
    players: [attacker, defender]
  };
  const battle: Battle = {
    name: 'Battle',
    attacker: attacker.playerId,
    isDeath: false,
    result: {
      name: 'Miss'
    }
  };

  const result = rightItself(lastState, battle);
  const expected = {
    ...lastState,
    effect: {
      name: 'RightItself',
      defender: defender.playerId,
      battleResult: battle.result
    }
  };
  expect(result).toEqual(expected);
});