import type { Player } from "../../../src";
import { EMPTY_ARMDOZER, EMPTY_PILOT } from "../../../src";
import { start } from "../../../src/game/start/start";

const player1: Player = {
  playerId: "player1",
  pilot: EMPTY_PILOT,
  armdozer: { ...EMPTY_ARMDOZER, speed: 1600 },
};
const player2: Player = {
  playerId: "player2",
  pilot: EMPTY_PILOT,
  armdozer: { ...EMPTY_ARMDOZER, speed: 2000 },
};

test("ゲームを正しく開始できる", () => {
  const result = start([player1, player2]);
  expect(result).toMatchSnapshot();
});
