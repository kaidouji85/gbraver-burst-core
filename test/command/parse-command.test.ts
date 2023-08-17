import { Command, parseCommand } from "../../src";

/** 有効なCommand */
const commands: Command[] = [
  {
    type: "BATTERY_COMMAND",
    battery: 4,
  },
  {
    type: "BURST_COMMAND",
  },
  {
    type: "PILOT_SKILL_COMMAND",
  },
  {
    type: "EMPTY_COMMAND",
  },
];

test("Commandはパースできる", () => {
  commands.forEach((command) => {
    expect(parseCommand(command)).toEqual(command);
  });
});

test("文字列からパースしたオブジェクトも、正しくパースできる", () => {
  commands.forEach((command) => {
    const str = JSON.stringify(command);
    const data = JSON.parse(str);
    expect(parseCommand(data)).toEqual(command);
  });
});

test("空オブジェクトはパースできない", () => {
  expect(parseCommand({})).toEqual(null);
});

test("nullはパースできない", () => {
  expect(parseCommand(null)).toEqual(null);
});

test("undefinedはパースできない", () => {
  expect(parseCommand(undefined)).toEqual(null);
});
