import { canContinuousActive } from "../../../src/effect/continuous-active";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { PlayerState } from "../../../src/state/player-state";

/** 連続攻撃を持つプレイヤー */
const continuousActivePlayer: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "isContinuousActivePlayer",
  armdozer: {
    ...EMPTY_PLAYER_STATE.armdozer,
    effects: [
      {
        type: "ContinuousActivePlayer",
        period: {
          type: "SpecialPeriod",
        },
      },
    ],
  },
};

/** 連続攻撃を持たないプレイヤー */
const noContinuousActivePlayer = {
  ...EMPTY_PLAYER_STATE,
  playerId: "noContinuousActivePlayer",
};

/** その他プレイヤー */
const otherPlayer = { ...EMPTY_PLAYER_STATE, playerId: "otherPlayer" };

test("攻撃側がアクティブプレイヤー継続を持つ場合、同効果は発動可能である", () => {
  const state = {
    ...EMPTY_GAME_STATE,
    players: [continuousActivePlayer, otherPlayer],
    activePlayerId: continuousActivePlayer.playerId,
  };
  expect(canContinuousActive(state)).toBe(true);
});

test("防御側がアクティブプレイヤー継続を持つ場合、同効果は発動しない", () => {
  const state = {
    ...EMPTY_GAME_STATE,
    players: [continuousActivePlayer, otherPlayer],
    activePlayerId: otherPlayer.playerId,
  };
  expect(canContinuousActive(state)).toBe(false);
});

test("攻撃側、防御側がアクティブプレイヤー継続を持たない場合、同効果は発動しない", () => {
  const state = {
    ...EMPTY_GAME_STATE,
    players: [noContinuousActivePlayer, otherPlayer],
    activePlayerId: noContinuousActivePlayer.playerId,
  };
  expect(canContinuousActive(state)).toBe(false);
});
