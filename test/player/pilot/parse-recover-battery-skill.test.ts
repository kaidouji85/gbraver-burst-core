import { parseRecoverBatterySkill, RecoverBatterySkill } from "../../../src";

/** 有効なRecoverBatterySkill */
const recoverBatterySkill: RecoverBatterySkill = {
  type: "RecoverBatterySkill",
  recoverBattery: 5,
};

test("RecoverBatterySkillはパースできる", () => {
  expect(parseRecoverBatterySkill(recoverBatterySkill)).toEqual(
    recoverBatterySkill,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(recoverBatterySkill);
  const data = JSON.parse(str);
  expect(parseRecoverBatterySkill(data)).toEqual(recoverBatterySkill);
});

test("RecoverBatterySkill以外はnullを返す", () => {
  const data = {
    type: "RecoverBattery",
    recover: 5,
  };
  expect(parseRecoverBatterySkill(data)).toBe(null);
});
