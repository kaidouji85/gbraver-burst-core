import { BatteryDeclaration, BatteryDeclarationSchema } from "../../../src";

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
  expect(BatteryDeclarationSchema.parse(batteryDeclaration)).toEqual(
    batteryDeclaration,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(batteryDeclaration);
  const data = JSON.parse(str);
  expect(BatteryDeclarationSchema.parse(data)).toEqual(batteryDeclaration);
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
  expect(() => BatteryDeclarationSchema.parse(data)).toThrow();
});
