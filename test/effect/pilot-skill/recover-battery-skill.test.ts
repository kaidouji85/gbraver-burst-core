import { pilotSkill } from "../../../src/effect/pilot-skill";
import { EMPTY_ARMDOZER_EFFECT } from "../../../src/empty/amrdozer-effect";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PILOT } from "../../../src/empty/pilot";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { RecoverBatterySkill } from "../../../src/player/pilot/recover-battery-skill";
import { GameState } from "../../../src/state/game-state";
import { PlayerState } from "../../../src/state/player-state";

/** スキル バッテリー回復 */
const skill: RecoverBatterySkill = {
  type: "RecoverBatterySkill",
  recoverBattery: 2,
};

/** スキル発動者 */
const invoker: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "invoker",
  armdozer: {
    ...EMPTY_PLAYER_STATE.armdozer,
    maxBattery: 5,
    battery: 2,
    effects: [EMPTY_ARMDOZER_EFFECT, EMPTY_ARMDOZER_EFFECT],
  },
  pilot: { ...EMPTY_PILOT, skill, enableSkill: true },
};

/** それ以外のプレイヤー */
const other: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "other" };

/** ゲームステート */
const state: GameState = {
  ...EMPTY_GAME_STATE,
  activePlayerId: invoker.playerId,
  players: [other, invoker],
};

test("バッテリー回復スキルを正しく適用できる", () => {
  const result = pilotSkill(state, invoker.playerId);
  expect(result).toMatchSnapshot();
});
