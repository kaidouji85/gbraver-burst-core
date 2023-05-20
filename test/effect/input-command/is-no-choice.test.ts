import type {BatteryCommand, Command, QuickCommand} from "../../../src";
import { isNoChoice } from "../../../src/effect/input-command";

const BATTERY_COMMAND: BatteryCommand = {
  type: "BATTERY_COMMAND",
  battery: 1,
};
const QUICK_COMMAND: QuickCommand = {
  type: "BURST_COMMAND",
};

test("相手だけがクイックコマンドを使った場合、コマンド選択不可能となる", () => {
  const myCommand: Command = BATTERY_COMMAND;
  const otherCommand: Command = QUICK_COMMAND;
  const result = isNoChoice(myCommand, otherCommand);
  expect(result).toBe(true);
});

test("自分だけがクイックコマンドを使った場合、コマンド選択可能である", () => {
  const myCommand = QUICK_COMMAND;
  const otherCommand: Command = BATTERY_COMMAND;
  const result = isNoChoice(myCommand, otherCommand);
  expect(result).toBe(false);
});

test("違いにバッテリーコマンドの場合、操作可能である", () => {
  const myCommand = BATTERY_COMMAND;
  const otherCommand: Command = BATTERY_COMMAND;
  const result = isNoChoice(myCommand, otherCommand);
  expect(result).toBe(false);
});

test("違いにクイックコマンドの場合、操作可能である", () => {
  const myCommand = QUICK_COMMAND;
  const otherCommand = QUICK_COMMAND;
  const result = isNoChoice(myCommand, otherCommand);
  expect(result).toBe(false);
});
