import { burst } from "../../../src/effect/burst";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { GameState } from "../../../src/state/game-state";
import { PlayerState } from "../../../src/state/player-state";

/** バースト発動者 */
const burstPlayer: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "burstPlayer",
  armdozer: {
    ...EMPTY_PLAYER_STATE.armdozer,
    battery: 1,
    maxBattery: 5,
    effects: [],
    enableBurst: true,
    burst: {
      type: "ContinuousAttack",
      recoverBattery: 3,
    },
  },
};

/** それ以外のプレイヤー */
const otherPlayer: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "otherPlayer",
};

/** ゲームステート */
const lastState: GameState = {
  ...EMPTY_GAME_STATE,
  activePlayerId: otherPlayer.playerId,
  players: [otherPlayer, burstPlayer],
};

test("連続攻撃バーストが正しく適用できる", () => {
  const result = burst(lastState, burstPlayer.playerId);
  expect(result).toMatchSnapshot();
});
