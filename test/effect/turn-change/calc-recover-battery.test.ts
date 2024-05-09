import {
  ArmdozerEffect,
  BatteryRecoverSkip,
  CorrectPower,
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
  TurnStartBatteryCorrect,
} from "../../../src";
import { calcRecoverBattery } from "../../../src/effect/turn-change/recover-battery";

/** 効果 ターン開始時のバッテリー回復をスキップ */
const batteryRecoverSkip: BatteryRecoverSkip = {
  type: "BatteryRecoverSkip",
  period: {
    type: "SpecialPeriod",
  },
};

/**
 * 効果 ターン開始時バッテリー回復量の補正 を生成する
 * @param correctBattery バッテリー補正値
 * @returns 生成結果
 */
const createTurnStartBatteryCorrect = (
  correctBattery: number,
): TurnStartBatteryCorrect => ({
  type: "TurnStartBatteryCorrect",
  correctBattery,
  period: {
    type: "SpecialPeriod",
  },
});

/** その他 効果 */
const otherEffect: CorrectPower = {
  type: "CorrectPower",
  power: 1000,
  period: {
    type: "SpecialPeriod",
  },
};

/**
 * テスト用プレイヤーを生成する
 * @param battery 現在のバッテリー
 * @param effects 現在の効果
 * @returns 生成結果
 */
const createPlayer = (
  battery: number,
  effects: ArmdozerEffect[],
): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "player1",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery,
    maxBattery: 5,
    effects,
  },
});

test("ターン開始時にバッテリーが3回復する", () => {
  const player = createPlayer(1, []);
  expect(calcRecoverBattery(player)).toEqual({
    battery: 4,
    recoverBattery: 3,
  });
});

test("バッテリー最大値以上にはならない", () => {
  const player = createPlayer(4, []);
  expect(calcRecoverBattery(player)).toEqual({
    battery: 5,
    recoverBattery: 3,
  });
});

test("BatteryRecoverSkipが適用されている場合、ターン開始時のバッテリー回復はなし", () => {
  const player = createPlayer(1, [batteryRecoverSkip]);
  expect(calcRecoverBattery(player)).toEqual({
    battery: 1,
    recoverBattery: 0,
  });
});

test("TurnStartBatteryCorrectが適用されている、ターン開始時回復バッテリーが補正される", () => {
  const player = createPlayer(1, [createTurnStartBatteryCorrect(1)]);
  expect(calcRecoverBattery(player)).toEqual({
    battery: 5,
    recoverBattery: 4,
  });
});

test("TurnStartBatteryCorrectが複数適用されている場合、バッテリー補正はその合計値となる", () => {
  const player = createPlayer(0, [
    createTurnStartBatteryCorrect(1),
    otherEffect,
    otherEffect,
    createTurnStartBatteryCorrect(1),
  ]);
  expect(calcRecoverBattery(player)).toEqual({
    battery: 5,
    recoverBattery: 5,
  });
});

test("BatteryRecoverSkip、TurnStartBatteryCorrectが同時適用されている場合、ターン開始時のバッテリー回復はなし", () => {
  const player = createPlayer(1, [
    batteryRecoverSkip,
    createTurnStartBatteryCorrect(1),
  ]);
  expect(calcRecoverBattery(player)).toEqual({
    battery: 1,
    recoverBattery: 0,
  });
});
