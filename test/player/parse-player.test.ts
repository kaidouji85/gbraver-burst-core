import { EMPTY_PLAYER, parsePlayer, Player } from "../../src";

test("Playerはパースできる", () => {
  const data: Player = EMPTY_PLAYER;
  expect(parsePlayer(data)).toEqual(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: Player = EMPTY_PLAYER;
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(parsePlayer(data)).toEqual(origin);
});

test("Player以外はnullを返す", () => {
  const data = {
    id: "player",
    armdozer: {
      id: "ShinBraver",
      hp: 3000,
      power: 2000,
      speed: 2000,
    },
    pilot: {
      id: "Shinya",
      skill: {
        type: "BatteryRecover",
        recover: 2,
      },
    },
  };
  expect(parsePlayer(data)).toBe(null);
});
