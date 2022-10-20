// @flow
import path from "path";

import type { GameState, PlayerState } from "../../../src";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { reflectFlow } from "../../../src/game/progress/battle-flow";
import {
  exportSnapShotJSON,
  importSnapShotJSON,
  shouldUpdateSnapShot,
} from "../../snap-shot";

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
    ],
  },
};

test("ダメージ反射が正しく適用される", () => {
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [ATTACKER, DEFENDER],
  };

  const result = reflectFlow(lastState, "attacker");
  const snapShotPath = path.join(
    __dirname,
    "reflect-flow__single-reflect.json"
  );
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});

test("ダメージ反射の重ね掛けも正しく処理される", () => {
  const multiReflect: PlayerState = {
    ...DEFENDER,
    armdozer: {
      ...DEFENDER.armdozer,
      effects: [
        ...DEFENDER.armdozer.effects,
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
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [ATTACKER, multiReflect],
  };

  const result = reflectFlow(lastState, "attacker");
  const snapShotPath = path.join(__dirname, "reflect-flow__multi-reflect.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});
