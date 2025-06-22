import { selectableBatteryCommand } from "../../../src/effect/input-command/selectable-battery-command";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { ArmdozerState } from "../../../src/state/armdozer-state";

const ARMDOZER_STATE: ArmdozerState = {
  ...EMPTY_ARMDOZER_STATE,
  maxBattery: 5,
  battery: 5,
};

test("バッテリーが満タンなら0〜最大値まで入力可能", () => {
  expect(selectableBatteryCommand(ARMDOZER_STATE)).toEqual([
    {
      type: "BATTERY_COMMAND",
      battery: 0,
    },
    {
      type: "BATTERY_COMMAND",
      battery: 1,
    },
    {
      type: "BATTERY_COMMAND",
      battery: 2,
    },
    {
      type: "BATTERY_COMMAND",
      battery: 3,
    },
    {
      type: "BATTERY_COMMAND",
      battery: 4,
    },
    {
      type: "BATTERY_COMMAND",
      battery: 5,
    },
  ]);
});

test("バッテリーが0なら0以外は入力不可能", () => {
  expect(selectableBatteryCommand({ ...ARMDOZER_STATE, battery: 0 })).toEqual([
    {
      type: "BATTERY_COMMAND",
      battery: 0,
    },
  ]);
});

test("バッテリーが3なら0〜3まで入力可能", () => {
  expect(selectableBatteryCommand({ ...ARMDOZER_STATE, battery: 3 })).toEqual([
    {
      type: "BATTERY_COMMAND",
      battery: 0,
    },
    {
      type: "BATTERY_COMMAND",
      battery: 1,
    },
    {
      type: "BATTERY_COMMAND",
      battery: 2,
    },
    {
      type: "BATTERY_COMMAND",
      battery: 3,
    },
  ]);
});
