import { EMPTY_PLAYER, Player, PlayerSchema } from "../../src";

test("Playerはパースできる", () => {
  const data: Player = EMPTY_PLAYER;
  expect(PlayerSchema.parse(data)).toEqual(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: Player = EMPTY_PLAYER;
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(PlayerSchema.parse(data)).toEqual(origin);
});

test("Player以外は例外を投げる", () => {
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
  expect(() => PlayerSchema.parse(data)).toThrow();
});
