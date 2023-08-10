import { ContinuousAttack, parseContinuousAttack } from "../../src";

test("ContinuousAttackはパースできる", () => {
  const data: ContinuousAttack = {
    type: "ContinuousAttack",
    recoverBattery: 3,
  };
  expect(parseContinuousAttack(data)).toEqual(data);
});

test("ContinuousAttack以外はnullを返す", () => {
  const data = {
    type: "Continuous",
    recover: 3,
  };
  expect(parseContinuousAttack(data)).toBe(null);
});
