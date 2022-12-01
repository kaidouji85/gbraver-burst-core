// @flow

import { EMPTY_ARMDOZER_STATE } from "../../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../../src/empty/player";
import type { GameState } from "../../../../src/state/game-state";
import type { PlayerState } from "../../../../src/state/player-state";

/** 攻撃側プレイヤー */
const ATTACKER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    hp: 3000,
    maxHp: 3000,
  },
};

/** 防御側プレイヤー */
const DEFENDER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    hp: 3000,
    maxHp: 3000,
    effects: [
      {
        type: "TryReflect",
        damage: 5000,
        effect: "Lightning",
        period: {
          type: "TurnLimit",
          remainingTurn: 2,
        },
      },
      {
        type: "TryReflect",
        damage: 3000,
        effect: "Lightning",
        period: {
          type: "TurnLimit",
          remainingTurn: 2,
        },
      },
      {
        type: "TryReflect",
        damage: 2000,
        effect: "Lightning",
        period: {
          type: "TurnLimit",
          remainingTurn: 2,
        },
      },
    ],
  },
};

/** 最新のゲームステート */
export const lastState: GameState = {
  ...EMPTY_GAME_STATE,
  players: [ATTACKER, DEFENDER],
};
