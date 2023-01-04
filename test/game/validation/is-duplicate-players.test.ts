import { EMPTY_PLAYER } from "../../../src";
import { isDuplicatePlayers } from "../../../src/game/validation/is-duplicate-players";
const player1 = { ...EMPTY_PLAYER,
  playerId: "player1"
};
const player2 = { ...EMPTY_PLAYER,
  playerId: "player2"
};
test("同じIDを持つプレイヤーが2人いると、ユーザ重複であると", () => {
  const result = isDuplicatePlayers([player1, player1]);
  expect(result).toBe(true);
});
test("IDが違うユーザ同士だと、ユーザ重複でない", () => {
  const result = isDuplicatePlayers([player1, player2]);
  expect(result).toBe(false);
});