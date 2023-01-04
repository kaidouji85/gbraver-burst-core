import { reflect } from "../../../src/effect/reflect";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import type { PlayerState } from "../../../src/state/player-state";

test("ダメージ反射を正しく適用できる", () => {
  const damagedPlayer: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "damagedPlayer",
    armdozer: { ...EMPTY_PLAYER_STATE.armdozer,
      hp: 3000,
      maxHp: 3000
    }
  };
  const otherPlayer: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "otherPlayer"
  };
  const lastState = { ...EMPTY_GAME_STATE,
    players: [otherPlayer, damagedPlayer]
  };
  const result = reflect(lastState, damagedPlayer.playerId, {
    damage: 2000,
    effect: "Lightning"
  });
  const expected = { ...lastState,
    players: [otherPlayer, { ...damagedPlayer,
      armdozer: { ...damagedPlayer.armdozer,
        hp: 1000
      }
    }],
    effect: {
      name: "Reflect",
      damagedPlayer: "damagedPlayer",
      damage: 2000,
      effect: "Lightning",
      isDeath: false
    }
  };
  expect(result).toEqual(expected);
});