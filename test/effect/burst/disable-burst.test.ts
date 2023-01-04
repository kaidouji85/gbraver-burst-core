import { disableBurst } from "../../../src/effect/burst";
import { EMPTY_BURST } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
test("バーストしたプレイヤーはバースト利用不可になる", () => {
  const burstPlayer = { ...EMPTY_PLAYER_STATE,
    playerId: "burstPlayer",
    armdozer: { ...EMPTY_PLAYER_STATE.armdozer,
      enableBurst: true
    }
  };
  const otherPlayer = { ...EMPTY_PLAYER_STATE,
    playerId: "otherPlayer"
  };
  const lastState = { ...EMPTY_GAME_STATE,
    players: [otherPlayer, burstPlayer],
    effect: {
      name: "BurstEffect",
      burstPlayer: burstPlayer.playerId,
      burst: EMPTY_BURST
    }
  };
  const result = disableBurst(lastState);
  const expected = { ...lastState,
    players: [otherPlayer, { ...burstPlayer,
      armdozer: { ...burstPlayer.armdozer,
        enableBurst: false
      }
    }]
  };
  expect(result).toEqual(expected);
});