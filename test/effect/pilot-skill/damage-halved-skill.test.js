// @flow
import type {GameState, PlayerState} from "../../../src";
import {damageHalvedSkill} from "../../../src/effect/pilot-skill/damage-halved-skill";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import type {DamageHalvedSkill} from "../../../src/player/pilot";

test('ダメージ半減スキルが正しく発動できる', () => {
  const skill: DamageHalvedSkill = {type: 'DamageHalvedSkill', decrease: 600, duration: 2};
  const invoker: PlayerState = {...EMPTY_PLAYER_STATE, playerId: 'invoker'};
  const other: PlayerState = {...EMPTY_PLAYER_STATE, playerId: 'other'};
  const state: GameState = {...EMPTY_GAME_STATE, players: [other, invoker]};
  expect(damageHalvedSkill(state, invoker.playerId, skill)).toEqual({
    ...state,
    players: [
      other,
      {...invoker,
        armdozer: {...invoker.armdozer,
          effects: [...invoker.armdozer.effects,
            {type: 'DamageHalved', period: {type: 'TurnLimit', remainingTurn: 2}}
          ]
        }
      }
    ],
    effect: {name: 'PilotSkillEffect', invokerId: invoker.playerId, skill: skill}
  });
});