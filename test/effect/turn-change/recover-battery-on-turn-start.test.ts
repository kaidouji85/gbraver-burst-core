import {
  ArmdozerEffect,
  BatteryRecoverSkip,
  CorrectPower,
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
  TurnStartBatteryCorrect,
} from "../../../src";
import { recoverBatteryOnTurnStart } from "../../../src/effect/turn-change/recover-battery-on-turn-start";

/** 効果 ターン開始時のバッテリー回復をスキップ */
const batteryRecoverSkip: BatteryRecoverSkip = {
  type: "BatteryRecoverSkip",
  period: {
    type: "SpecialPeriod",
  },
};

/**
 * 効果 ターン開始時バッテリー回復量補正 を生成する
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
 * @param options オプション
 * @returns 生成結果
 */
const createPlayer = (options: {
  /** 現在のバッテリー */
  battery: number;
  /** ターン開始時のバッテリー回復量基礎値 */
  batteryAutoRecovery: number;
  /** 現在の効果 */
  effects: ArmdozerEffect[];
}): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "player1",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    ...options,
    maxBattery: 5,
  },
});

describe("recoverBatteryOnTurnStart", () => {
  describe("batteryAutoRecoveryのテスト", () => {
    test("batteryA∏∏utoRecovery=3: ターン開始時にバッテリーが3回復する", () => {
      const player = createPlayer({
        battery: 1,
        batteryAutoRecovery: 3,
        effects: [],
      });
      expect(recoverBatteryOnTurnStart(player)).toEqual({
        battery: 4,
        recoverBattery: 3,
      });
    });

    test("batteryAutoRecovery=2: ターン開始時にバッテリーが2回復する", () => {
      const player = createPlayer({
        battery: 1,
        batteryAutoRecovery: 2,
        effects: [],
      });
      expect(recoverBatteryOnTurnStart(player)).toEqual({
        battery: 3,
        recoverBattery: 2,
      });
    });

    test("batteryAutoRecovery=5: バッテリー最大値以上にはならない", () => {
      const player = createPlayer({
        battery: 4,
        batteryAutoRecovery: 5,
        effects: [],
      });
      expect(recoverBatteryOnTurnStart(player)).toEqual({
        battery: 5,
        recoverBattery: 5,
      });
    });

    test("batteryAutoRecovery=0: ターン開始時にバッテリーが回復しない", () => {
      const player = createPlayer({
        battery: 2,
        batteryAutoRecovery: 0,
        effects: [],
      });
      expect(recoverBatteryOnTurnStart(player)).toEqual({
        battery: 2,
        recoverBattery: 0,
      });
    });
  });

  describe("BatteryRecoverSkipのテスト", () => {
    test("BatteryRecoverSkipが適用されている場合、ターン開始時のバッテリー回復はなし", () => {
      const player = createPlayer({
        battery: 1,
        batteryAutoRecovery: 3,
        effects: [batteryRecoverSkip],
      });
      expect(recoverBatteryOnTurnStart(player)).toEqual({
        battery: 1,
        recoverBattery: 0,
      });
    });

    test("batteryAutoRecovery=5 かつ BatteryRecoverSkipが適用されている場合も回復なし", () => {
      const player = createPlayer({
        battery: 2,
        batteryAutoRecovery: 5,
        effects: [batteryRecoverSkip],
      });
      expect(recoverBatteryOnTurnStart(player)).toEqual({
        battery: 2,
        recoverBattery: 0,
      });
    });
  });

  describe("TurnStartBatteryCorrectのテスト", () => {
    test("TurnStartBatteryCorrectが適用されているとき、回復量が補正される", () => {
      const player = createPlayer({
        battery: 1,
        batteryAutoRecovery: 3,
        effects: [createTurnStartBatteryCorrect(1)],
      });
      expect(recoverBatteryOnTurnStart(player)).toEqual({
        battery: 5,
        recoverBattery: 4,
      });
    });

    test("batteryAutoRecovery=2, TurnStartBatteryCorrect=2 の場合、合計4回復", () => {
      const player = createPlayer({
        battery: 0,
        batteryAutoRecovery: 2,
        effects: [createTurnStartBatteryCorrect(2)],
      });
      expect(recoverBatteryOnTurnStart(player)).toEqual({
        battery: 4,
        recoverBattery: 4,
      });
    });

    test("TurnStartBatteryCorrectが複数適用されている場合、バッテリー補正はその合計値となる", () => {
      const player = createPlayer({
        battery: 0,
        batteryAutoRecovery: 3,
        effects: [
          createTurnStartBatteryCorrect(1),
          otherEffect,
          otherEffect,
          createTurnStartBatteryCorrect(1),
        ],
      });
      expect(recoverBatteryOnTurnStart(player)).toEqual({
        battery: 5,
        recoverBattery: 5,
      });
    });
  });

  describe("BatteryRecoverSkipとTurnStartBatteryCorrectの同時適用", () => {
    test("BatteryRecoverSkip、TurnStartBatteryCorrectが同時適用されている場合、ターン開始時のバッテリー回復はなし", () => {
      const player = createPlayer({
        battery: 1,
        batteryAutoRecovery: 3,
        effects: [batteryRecoverSkip, createTurnStartBatteryCorrect(1)],
      });
      expect(recoverBatteryOnTurnStart(player)).toEqual({
        battery: 1,
        recoverBattery: 0,
      });
    });
  });
});
