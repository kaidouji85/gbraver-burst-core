import {
  burst,
  EMPTY_ARMDOZER_EFFECT,
  EMPTY_ARMDOZER_STATE,
  EMPTY_GAME_STATE,
  EMPTY_PLAYER_STATE,
  GameState,
  PlayerState,
} from "../../../src";

/** バースト発動者 */
const burstPlayer: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "burst",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    enableBurst: true,
    battery: 1,
    maxBattery: 5,
    effects: [EMPTY_ARMDOZER_EFFECT, EMPTY_ARMDOZER_EFFECT],
    burst: {
      type: "ForceTurnEnd",
      recoverBattery: 2,
    },
  },
};

/** それ以外のプレイヤー */
const otherPlayer: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "other" };

/** ゲームステート */
const lastState: GameState = {
  ...EMPTY_GAME_STATE,
  activePlayerId: otherPlayer.playerId,
  players: [otherPlayer, burstPlayer],
};

test("強制ターン終了バーストの適用が正しくできる", () => {
  const result = burst(lastState, burstPlayer.playerId);
  expect(result).toMatchSnapshot();
});
