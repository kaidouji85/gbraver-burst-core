import type {
  BatteryCommand,
  BurstCommand,
  PilotSkillCommand,
} from "../../../src";
import { isNoChoice } from "../../../src/effect/input-command";

/** バッテリーコマンド */
const battery: BatteryCommand = {
  type: "BATTERY_COMMAND",
  battery: 1,
};

/** バーストコマンド */
const burst: BurstCommand = {
  type: "BURST_COMMAND",
};

/** パイロットスキルコマンド */
const pilotSkill: PilotSkillCommand = {
  type: "PILOT_SKILL_COMMAND",
};

test.each([
  { myCommand: battery, otherCommand: battery, expected: false },
  { myCommand: battery, otherCommand: burst, expected: true },
  {
    myCommand: battery,
    otherCommand: pilotSkill,
    expected: true,
  },
  { myCommand: burst, otherCommand: battery, expected: false },
  { myCommand: burst, otherCommand: burst, expected: false },
  { myCommand: burst, otherCommand: pilotSkill, expected: false },
  {
    myCommand: pilotSkill,
    otherCommand: battery,
    expected: false,
  },
  { myCommand: pilotSkill, otherCommand: burst, expected: false },
  {
    myCommand: pilotSkill,
    otherCommand: pilotSkill,
    expected: false,
  },
])(
  "自分コマンド=バッテリー and 相手コマンド=(バースト or パイロットスキル) の場合、自分はコマンド選択不可となる[myCommand=$myCommand.type, otherCommand=$otherCommand.type]",
  ({ myCommand, otherCommand, expected }) => {
    expect(isNoChoice(myCommand, otherCommand)).toBe(expected);
  },
);
