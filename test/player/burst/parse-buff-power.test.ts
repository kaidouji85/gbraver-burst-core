import { BuffPower, parseBuffPower } from "../../../src";

/** 有効なBuffPower */
const buffPower: BuffPower = {
  type: "BuffPower",
  buffPower: 1000,
  duration: 3,
  recoverBattery: 3,
};

test("BuffPowerはパースできる", () => {
  expect(parseBuffPower(buffPower)).toEqual(buffPower);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(buffPower);
  const data = JSON.parse(str);
  expect(parseBuffPower(data)).toEqual(buffPower);
});

test("BuffPower以外はnullを返す", () => {
  const data = {
    type: "Buff",
    power: 1000,
    effectDuration: 3,
    battery: 3,
  };
  expect(parseBuffPower(data)).toBe(null);
});
