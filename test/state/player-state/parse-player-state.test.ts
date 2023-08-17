import { EMPTY_PLAYER_STATE, parsePlayerState } from "../../../src";

test("PlayerStateはパースできる", () => {
  const data = EMPTY_PLAYER_STATE;
  expect(parsePlayerState(data)).toEqual(data);
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
  expect(parsePlayerState(data)).toBeNull();
});
