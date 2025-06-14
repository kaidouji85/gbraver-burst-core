import { BatteryCommand } from "../../../src/command/battery";
import { EMPTY_PLAYER } from "../../../src/empty/player";
import { PlayerCommand } from "../../../src/game/command/player-command";
import { isAllPlayerEnteredCommand } from "../../../src/game/validation/is-all-player-entered-command";
import { Player } from "../../../src/player/player";

const player1 = { ...EMPTY_PLAYER, playerId: "player1" };
const player2 = { ...EMPTY_PLAYER, playerId: "player2" };
const command: BatteryCommand = {
  type: "BATTERY_COMMAND",
  battery: 0,
};
const player1Command: PlayerCommand = {
  playerId: player1.playerId,
  command,
};
const player2Command: PlayerCommand = {
  playerId: player2.playerId,
  command,
};

test("全プレイヤーがコマンド入力したことを正しく検知できる", () => {
  const players: [Player, Player] = [player1, player2];
  const commands: [PlayerCommand, PlayerCommand] = [
    player1Command,
    player2Command,
  ];
  const result = isAllPlayerEnteredCommand(players, commands);
  expect(result).toBe(true);
});

test("1人のプレイヤーしかコマンド入力していない場合、全プレイヤー入力でないと判定する", () => {
  const players: [Player, Player] = [player1, player2];
  const commands: [PlayerCommand, PlayerCommand] = [
    player1Command,
    player1Command,
  ];
  const result = isAllPlayerEnteredCommand(players, commands);
  expect(result).toBe(false);
});
