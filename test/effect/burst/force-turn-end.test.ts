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

/** ゲームに参加しているプレイヤー */
const players = [otherPlayer, burstPlayer];

test("相手ターンに強制ターンエンドを発動した場合、自分が攻撃プレイヤーになる", () => {
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: otherPlayer.playerId,
    players,
  };
  const result = burst(lastState, burstPlayer.playerId);
  expect(result).toMatchSnapshot();
});

test("自分ターンに強制ターンエンドを発動した場合、引き続き自分が攻撃プレイヤーである", () => {
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: burstPlayer.playerId,
    players,
  };
  const result = burst(lastState, burstPlayer.playerId);
  expect(result).toMatchSnapshot();
});
