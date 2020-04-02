import test from 'ava';
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import type {Battle, BattleResult, GameState} from "../../../../src";
import {rightItself} from "../../../../src/effect/right-itself";
import {EMPTY_PLAYER_STATE} from "../../../data/player";

test('防御側体勢整え効果が正しく適用できる', t => {
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
  t.deepEqual(result, expected);
});