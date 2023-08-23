import { ContinuousAttack, ContinuousAttackSchema } from "../../../src";

/** 有効なContinuousAttack */
const continuousAttack: ContinuousAttack = {
  type: "ContinuousAttack",
  recoverBattery: 3,
};

test("ContinuousAttackはパースできる", () => {
  expect(ContinuousAttackSchema.parse(continuousAttack)).toEqual(
    continuousAttack,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(continuousAttack);
  const data = JSON.parse(str);
  expect(ContinuousAttackSchema.parse(data)).toEqual(continuousAttack);
});

test("ContinuousAttack以外はnullを返す", () => {
  const data = {
    type: "Continuous",
    recover: 3,
  };
  expect(() => ContinuousAttackSchema.parse(data)).toThrow();
});
