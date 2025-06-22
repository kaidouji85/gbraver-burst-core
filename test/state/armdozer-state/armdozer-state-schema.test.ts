import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import {
  ArmdozerState,
  ArmdozerStateSchema,
} from "../../../src/state/armdozer-state";

/** 有効なArmdozerState */
const armdozerState: ArmdozerState = EMPTY_ARMDOZER_STATE;

test("ArmdozerStateはパースできる", () => {
  expect(ArmdozerStateSchema.parse(armdozerState)).toEqual(armdozerState);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(armdozerState);
  const data = JSON.parse(str);
  expect(ArmdozerStateSchema.parse(data)).toEqual(armdozerState);
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
  expect(() => ArmdozerStateSchema.parse(data)).toThrow();
});
