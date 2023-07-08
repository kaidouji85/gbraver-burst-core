import { Command, isCommandEqual } from "../../src/command/command";

test("等しい空コマンドと判定できる", () => {
  expect(
    isCommandEqual(
      {
        type: "EMPTY_COMMAND",
      },
      {
        type: "EMPTY_COMMAND",
      },
    ),
  ).toBe(true);
});

test("等しいバッテリーコマンドと判定できる", () => {
  expect(
    isCommandEqual(
      {
        type: "BATTERY_COMMAND",
        battery: 3,
      },
      {
        type: "BATTERY_COMMAND",
        battery: 3,
      },
    ),
  ).toBe(true);
});

test("異なるバッテリーコマンドと判定できる", () => {
  expect(
    isCommandEqual(
      {
        type: "BATTERY_COMMAND",
        battery: 3,
      },
      {
        type: "BATTERY_COMMAND",
        battery: 4,
      },
    ),
  ).toBe(false);
});

test("等しいバーストコマンドと判定できる", () => {
  expect(
    isCommandEqual(
      {
        type: "BURST_COMMAND",
      },
      {
        type: "BURST_COMMAND",
      },
    ),
  ).toBe(true);
});

test("等しいパイロットスキルコマンドと判定できる", () => {
  expect(
    isCommandEqual(
      {
        type: "PILOT_SKILL_COMMAND",
      },
      {
        type: "PILOT_SKILL_COMMAND",
      },
    ),
  ).toBe(true);
});

test("コマンド種別がことなると別コマンドだと判定できる", () => {
  const commands: Command[] = [
    { type: "EMPTY_COMMAND" },
    { type: "BATTERY_COMMAND", battery: 3 },
    { type: "BURST_COMMAND" },
  ];
  commands.forEach((command) => {
    expect(
      isCommandEqual(
        {
          type: "PILOT_SKILL_COMMAND",
        },
        command,
      ),
    ).toBe(false);
  });
});
