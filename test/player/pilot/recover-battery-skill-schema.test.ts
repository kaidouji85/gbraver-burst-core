import { RecoverBatterySkill, RecoverBatterySkillSchema } from "../../../src";

/** 有効なRecoverBatterySkill */
const recoverBatterySkill: RecoverBatterySkill = {
  type: "RecoverBatterySkill",
  recoverBattery: 5,
};

test("RecoverBatterySkillはパースできる", () => {
  expect(RecoverBatterySkillSchema.parse(recoverBatterySkill)).toEqual(
    recoverBatterySkill,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(recoverBatterySkill);
  const data = JSON.parse(str);
  expect(RecoverBatterySkillSchema.parse(data)).toEqual(recoverBatterySkill);
});

test("RecoverBatterySkill以外は例外を投げる", () => {
  const data = {
    type: "RecoverBattery",
    recover: 5,
  };
  expect(() => RecoverBatterySkillSchema.parse(data)).toThrow();
});
