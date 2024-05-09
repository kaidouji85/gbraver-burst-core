import {
  ArmdozerEffect,
  BatteryRecoverSkip,
  ContinuousActivePlayer,
  EMPTY_ARMDOZER_EFFECT,
  GameState,
  PlayerState,
  TurnStartBatteryCorrect,
} from "../../../src";
import { continuousActive } from "../../../src/effect/continuous-active";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";

/** 効果 アクティブプレイヤー継続 */
const CONTINUOUS_ACTIVE: ContinuousActivePlayer = {
  type: "ContinuousActivePlayer",
  period: {
    type: "SpecialPeriod",
  },
};

/** 効果 ターン開始時バッテリー回復スキップ */
const BATTERY_RECOVER_SKIP: BatteryRecoverSkip = {
  type: "BatteryRecoverSkip",
  period: {
    type: "SpecialPeriod",
  },
};

/** ターン開始時バッテリー回復量補正 */
const TURN_START_BATTERY_CORRECT: TurnStartBatteryCorrect = {
  type: "TurnStartBatteryCorrect",
  correctBattery: 1,
  period: {
    type: "SpecialPeriod",
  },
};

/**
 * 攻撃側プレイヤーを生成する
 * @param battery 現在のバッテリー値
 * @param effects 現在の効果
 * @returns 生成結果
 */
const createAttacker = (
  battery: number,
  effects: ArmdozerEffect[],
): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery,
    maxBattery: 5,
    effects: [EMPTY_ARMDOZER_EFFECT, EMPTY_ARMDOZER_EFFECT, ...effects],
  },
});

/** 防御側プレイヤー */
const defender: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 2,
    maxBattery: 5,
    effects: [CONTINUOUS_ACTIVE],
  },
};

test("アクティブプレイヤー継続が正しく処理できる", () => {
  const attacker = createAttacker(2, [CONTINUOUS_ACTIVE]);
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const result = continuousActive(lastState);
  expect(result).toMatchSnapshot("no-other-effects");
});

test("BatteryRecoverSkip、TurnStartBatteryCorrectは取り除かれる", () => {
  const attacker = createAttacker(2, [
    CONTINUOUS_ACTIVE,
    BATTERY_RECOVER_SKIP,
    TURN_START_BATTERY_CORRECT,
  ]);
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const result = continuousActive(lastState);
  expect(result).toMatchSnapshot("battery-recover-skip");
});
