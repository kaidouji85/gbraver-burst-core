import { turnChange } from "../../../src/effect/turn-change";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { ArmdozerEffect } from "../../../src/state/armdozer-effect";
import { BatteryRecoverSkip } from "../../../src/state/armdozer-effect/battery-recover-skip";
import { TurnStartBatteryCorrect } from "../../../src/state/armdozer-effect/turn-start-battery-correction";
import { GameState } from "../../../src/state/game-state";

/** 効果 ターン開始時バッテリー回復スキップ */
const batteryRecoverSkip: BatteryRecoverSkip = {
  type: "BatteryRecoverSkip",
  period: {
    type: "SpecialPeriod",
  },
};

/** 効果 ターン開始時バッテリー回復量補正 */
const turnStartBatteryCorrect: TurnStartBatteryCorrect = {
  type: "TurnStartBatteryCorrect",
  correctBattery: 1,
  period: {
    type: "SpecialPeriod",
  },
};

/** 攻撃側プレイヤー */
const attacker = {
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 2,
    maxBattery: 5,
    effects: [],
  },
};

/**
 * 防御側プレイヤーを生成する
 * @param battery 現在のバッテリー値
 * @param effects 現在の効果
 * @returns 生成結果
 */
const createDefender = (battery: number, effects: ArmdozerEffect[]) => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery,
    maxBattery: 5,
    effects,
  },
});

test("ターン交代が正しく処理できる", () => {
  const defender = createDefender(2, []);
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const result = turnChange(lastState);
  expect(result).toMatchSnapshot("has-no-effects");
});

test("BatteryRecoverSkipがある場合は、バッテリー回復しない", () => {
  const defender = createDefender(2, [batteryRecoverSkip]);
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const result = turnChange(lastState);
  expect(result).toMatchSnapshot("battery-recover-skip");
});

test("TurnStartBatteryCorrectがある場合、回復量が補正される", () => {
  const defender = createDefender(2, [turnStartBatteryCorrect]);
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const result = turnChange(lastState);
  expect(result).toMatchSnapshot("turn-start-battery-correct");
});
