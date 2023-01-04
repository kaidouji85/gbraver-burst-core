import { EMPTY_PLAYER } from "../../../src";
import { isAllPlayerEnteredCommand } from "../../../src/game/validation/is-all-player-entered-command";
const player1 = { ...EMPTY_PLAYER,
  playerId: "player1"
};
const player2 = { ...EMPTY_PLAYER,
  playerId: "player2"
};
const command = {
  type: "BATTERY_COMMAND",
  battery: 0
};
const player1Command = {
  playerId: player1.playerId,
  command
};
const player2Command = {
  playerId: player2.playerId,
  command
};
test("全プレイヤーがコマンド入力したことを正しく検知できる", () => {
  const players = [player1, player2];
  const commands = [player1Command, player2Command];
  const result = isAllPlayerEnteredCommand(players, commands);
  expect(result).toBe(true);
});
test("1人のプレイヤーしかコマンド入力していない場合、全プレイヤー入力でないと判定する", () => {
  const players = [player1, player2];
  const commands = [player1Command, player1Command];
  const result = isAllPlayerEnteredCommand(players, commands);
  expect(result).toBe(false);
});