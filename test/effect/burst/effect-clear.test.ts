import { EMPTY_GAME_STATE, GameState, PlayerState } from "../../../src";
import { burst } from "../../../src/effect/burst";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";

/** バースト発動者 */
const burstPlayer: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "burstPlayer",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 2,
    maxBattery: 5,
    burst: {
      type: "EffectClear",
      recoverBattery: 2,
    },
    effects: [
      {
        type: "CorrectPower",
        power: 600,
        period: {
          type: "TurnLimit",
          remainingTurn: 2,
        },
      },
    ],
  },
};

/** それ以外 */
const otherPlayer: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "otherPlayer",
  armdozer: {
    ...EMPTY_PLAYER_STATE.armdozer,
    effects: [
      {
        type: "CorrectPower",
        power: 1000,
        period: {
          type: "TurnLimit",
          remainingTurn: 2,
        },
      },
      {
        type: "DamageHalved",
        period: {
          type: "TurnLimit",
          remainingTurn: 1,
        },
      },
    ],
  },
};

/** 最新ステート */
const lastState: GameState = {
  ...EMPTY_GAME_STATE,
  activePlayerId: otherPlayer.playerId,
  players: [otherPlayer, burstPlayer],
};

test("効果クリアを適用したので、相手の効果だけが削除される", () => {
  const result = burst(lastState, burstPlayer.playerId);
  expect(result).toMatchSnapshot();
});
