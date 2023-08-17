import { EMPTY_ARMDOZER_STATE, parseArmDozerState } from "../../../src";

test("ArmdozerStateはパースできる", () => {
  const data = EMPTY_ARMDOZER_STATE;
  expect(parseArmDozerState(data)).toEqual(data);
});

test("ArmdozerState以外はパースできない", () => {
  const data = {
    id: "id",
    name: "name",
    maxHp: 3000,
    maxBattery: 5,
    powerValue: 2000,
    speedValue: 2000,
  };
  expect(parseArmDozerState(data)).toBeNull();
});
