import { Command, CommandSchema } from "../../src/command/command";

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
];

test("Commandはパースできる", () => {
  commands.forEach((command) => {
    expect(CommandSchema.parse(command)).toEqual(command);
  });
});

test("文字列からパースしたオブジェクトも、正しくパースできる", () => {
  commands.forEach((command) => {
    const str = JSON.stringify(command);
    const data = JSON.parse(str);
    expect(CommandSchema.parse(data)).toEqual(command);
  });
});

test("空オブジェクトはパースできない", () => {
  expect(() => CommandSchema.parse({})).toThrow();
});

test("nullはパースできない", () => {
  expect(() => CommandSchema.parse(null)).toThrow();
});

test("undefinedはパースできない", () => {
  expect(() => CommandSchema.parse(undefined)).toThrow();
});
