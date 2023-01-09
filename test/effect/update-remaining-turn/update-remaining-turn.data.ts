import { EMPTY_ARMDOZER_EFFECT } from "../../../src/empty/amrdozer-effect";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import type {
  PermanentEffect,
  TurnLimitEffect,
} from "../../../src/state/armdozer-effect";
import type { GameState } from "../../../src/state/game-state";

/** 永続効果 */
const permanent: PermanentEffect = {
  type: "Permanent",
};

/**
 * ターン制限効果を生成するヘルパー関数
 * @param turn 効果継続ターン数
 * @return 生成結果
 */
const turnLimit = (turn: number): TurnLimitEffect => ({
  type: "TurnLimit",
  remainingTurn: turn,
});

/** プレイヤー1 */
const player1 = {
  ...EMPTY_PLAYER_STATE,
  playerId: "player1",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    effects: [
      { ...EMPTY_ARMDOZER_EFFECT, period: turnLimit(1) },
      { ...EMPTY_ARMDOZER_EFFECT, period: permanent },
      { ...EMPTY_ARMDOZER_EFFECT, period: turnLimit(4) },
    ],
  },
};

/** プレイヤー2 */
const player2 = {
  ...EMPTY_PLAYER_STATE,
  playerId: "player2",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    effects: [
      { ...EMPTY_ARMDOZER_EFFECT, period: turnLimit(1) },
      { ...EMPTY_ARMDOZER_EFFECT, period: turnLimit(3) },
    ],
  },
};

/** 最新のゲームステート */
export const lastState: GameState = {
  ...EMPTY_GAME_STATE,
  players: [player1, player2],
};
