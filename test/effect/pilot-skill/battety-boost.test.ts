import { pilotSkill } from "../../../src/effect/pilot-skill";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PILOT_STATE } from "../../../src/empty/pilot";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { ArmdozerEffect } from "../../../src/state/armdozer-effect";
import { GameState } from "../../../src/state/game-state";
import { PlayerState } from "../../../src/state/player-state";

/** BatteryRecoverSkip以外の効果 */
const effectOtherThanBatteryRecoverSkip: ArmdozerEffect = {
  type: "CorrectPower",
  power: 1000,
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

/** 効果発動プレイヤー */
const invoker: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "invoker",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 0,
    maxBattery: 8,
    effects: [
      effectOtherThanBatteryRecoverSkip,
      effectOtherThanBatteryRecoverSkip,
    ],
  },
  pilot: {
    ...EMPTY_PILOT_STATE,
    skill: {
      type: "BatteryBoostSkill",
      recoverBattery: 5,
    },
    enableSkill: true,
  },
};

/** それ以外のプレイヤー */
const other = {
  ...EMPTY_PLAYER_STATE,
  playerId: "other",
};

/** ゲームステート */
const lastState: GameState = {
  ...EMPTY_GAME_STATE,
  activePlayerId: other.playerId,
  players: [invoker, other],
};

test("バッテリーブーストスキルを正しく適用できる", () => {
  const result = pilotSkill(lastState, invoker.playerId);
  expect(result).toMatchSnapshot();
});
