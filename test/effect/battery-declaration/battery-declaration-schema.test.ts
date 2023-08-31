import { BatteryDeclarationSchema } from "../../../src";
import { validBatteryDeclaration } from "./valid-battery-declaration";

test("BatteryDeclarationはパースできる", () => {
  expect(BatteryDeclarationSchema.parse(validBatteryDeclaration)).toEqual(
    validBatteryDeclaration,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(validBatteryDeclaration);
  const data = JSON.parse(str);
  expect(BatteryDeclarationSchema.parse(data)).toEqual(validBatteryDeclaration);
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
