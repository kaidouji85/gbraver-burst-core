import {
  EMPTY_PLAYER_STATE,
  PlayerState,
  PlayerStateSchema,
} from "../../../src";

/** 有効なPlayerState */
const playerState: PlayerState = EMPTY_PLAYER_STATE;

test("PlayerStateはパースできる", () => {
  expect(PlayerStateSchema.parse(playerState)).toEqual(playerState);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(playerState);
  const data = JSON.parse(str);
  expect(PlayerStateSchema.parse(data)).toEqual(playerState);
});

test("PlayerState以外はパースできない", () => {
  const data = {
    id: "invalid-player-state",
    armdozer: {
      hp: 3000,
      battery: 5,
      power: 2000,
      speed: 2000,
    },
    pilot: {
      canSkill: true,
    },
  };
  expect(() => PlayerStateSchema.parse(data)).toThrow();
});
