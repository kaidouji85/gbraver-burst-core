import { BatteryDeclaration, parseBatteryDeclaration } from "../../../src";

/** 有効なBatteryDeclaration */
const batteryDeclaration: BatteryDeclaration = {
  name: "BatteryDeclaration",
  attacker: "attacker-player",
  attackerBattery: 4,
  originalBatteryOfAttacker: 3,
  defenderBattery: 5,
  originalBatteryOfDefender: 5,
};

test("BatteryDeclarationはパースできる", () => {
  expect(parseBatteryDeclaration(batteryDeclaration)).toEqual(batteryDeclaration);
});

test("BatteryDeclaration以外はパースできない", () => {
  const data = {
    type: "BatteryDeclaration",
    attacker: "attacker-player",
    attackerBattery: 4,
    originalBatteryOfAttacker: 3,
    defenderBattery: 5,
    originalBatteryOfDefender: 5,
  };
  expect(parseBatteryDeclaration(data)).toBeNull();
});
