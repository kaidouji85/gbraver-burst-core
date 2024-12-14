import type { BatteryCommand, BurstCommand } from "../../../../src";
import type { PilotSkillCommand } from "../../../../src/command/pilot-skill";
import { isEffectActivationFlow } from "../../../../src/game/progress/effect-activation-flow/is-effect-activation-flow";

const BURST_COMMAND: BurstCommand = {
  type: "BURST_COMMAND",
};
const BATTERY_COMMAND: BatteryCommand = {
  type: "BATTERY_COMMAND",
  battery: 2,
};
const PILOT_SKILL_COMMAND: PilotSkillCommand = {
  type: "PILOT_SKILL_COMMAND",
};

test("2人ともバッテリーを選択した場合、効果発動フローが実施されない", () => {
  const result = isEffectActivationFlow([
    {
      playerId: "player01",
      command: BATTERY_COMMAND,
    },
    {
      playerId: "player02",
      command: BATTERY_COMMAND,
    },
  ]);
  expect(result).toBe(false);
});

test("1人のプレイヤーがバーストを選択した場合、効果発動フローが実施される", () => {
  const result = isEffectActivationFlow([
    {
      playerId: "player01",
      command: BURST_COMMAND,
    },
    {
      playerId: "player02",
      command: BATTERY_COMMAND,
    },
  ]);
  expect(result).toBe(true);
});

test("1人のプレイヤーがパイロットスキルを選択した場合、効果発動フローが実施される", () => {
  const result = isEffectActivationFlow([
    {
      playerId: "player01",
      command: PILOT_SKILL_COMMAND,
    },
    {
      playerId: "player02",
      command: BATTERY_COMMAND,
    },
  ]);
  expect(result).toBe(true);
});

test("2人ともバーストを選択した場合、効果発動フローが実施される", () => {
  const result = isEffectActivationFlow([
    {
      playerId: "player01",
      command: BURST_COMMAND,
    },
    {
      playerId: "player02",
      command: BURST_COMMAND,
    },
  ]);
  expect(result).toBe(true);
});

test("2人ともパイロットスキルを選択した場合、効果発動フローが実施される", () => {
  const result = isEffectActivationFlow([
    {
      playerId: "player01",
      command: PILOT_SKILL_COMMAND,
    },
    {
      playerId: "player02",
      command: PILOT_SKILL_COMMAND,
    },
  ]);
  expect(result).toBe(true);
});

test("パイロットスキル、バーストを互いに選択した場合、効果発動フローが実施される", () => {
  const result = isEffectActivationFlow([
    {
      playerId: "player01",
      command: PILOT_SKILL_COMMAND,
    },
    {
      playerId: "player02",
      command: BURST_COMMAND,
    },
  ]);
  expect(result).toBe(true);
});
