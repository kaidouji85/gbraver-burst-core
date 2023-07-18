import { BatteryRecoverSkip, EMPTY_ARMDOZER_STATE, EMPTY_PLAYER_STATE, PlayerState } from "../../../src";
import { calcTurnChangeRecoverBattery } from "../../../src/effect/turn-change/recover-battery";

/** 効果 ターン開始時のバッテリー回復をスキップ */
const batteryRecoverSkip: BatteryRecoverSkip = {
  type: "BatteryRecoverSkip",
  period: {
    type: "Permanent"
  }
};

/**
 * テスト用プレイヤーを生成する
 * @param battery 現在のバッテリー
 * @param isBatteryRecoverSkip バッテリー回復スキップの効果を持つか、trueで持つ
 * @return 生成結果
 */
const createPlayer = (
  battery: number,
  isBatteryRecoverSkip: boolean
): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "player1",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery,
    maxBattery: 5,
    effects: isBatteryRecoverSkip
      ? [ batteryRecoverSkip ]
      : []
  },
});

test("ターン開始時のバッテリーが3回復する", () => {
  const player = createPlayer(1, false);
  expect(calcTurnChangeRecoverBattery(player)).toEqual({
    battery: 4,
    recoverBattery: 3,
  });
});

test("バッテリー最大値以上にはならない", () => {
  const player = createPlayer(4, false);
  expect(calcTurnChangeRecoverBattery(player)).toEqual({
    battery: 5,
    recoverBattery: 3,
  });
});

test("BatteryRecoverSkipが適用されている場合、ターン開始時のバッテリー回復はなし", () => {
  const player = createPlayer(1, true);
  expect(calcTurnChangeRecoverBattery(player)).toEqual({
    battery: 1,
    recoverBattery: 0,
  });
});