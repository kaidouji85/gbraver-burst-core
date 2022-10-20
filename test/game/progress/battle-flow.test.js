// @flow
import * as path from "path";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { battleFlow } from "../../../src/game/progress/battle-flow";
import type { GameState } from "../../../src/state/game-state";
import type { PlayerState } from "../../../src/state/player-state";
import {
  exportSnapShotJSON,
  importSnapShotJSON,
  shouldUpdateSnapShot,
} from "../../snap-shot";

test("戦闘したが、相手を倒しきれなかったのでゲーム続行", () => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "attacker",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: 3000,
      maxHp: 3000,
      power: 2000,
      battery: 4,
      maxBattery: 5,
    },
  };
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "defender",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: 3000,
      maxHp: 3000,
      power: 2000,
      battery: 5,
      maxBattery: 5,
    },
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: "attacker",
    players: [attacker, defender],
  };
  const commands = [
    {
      playerId: "attacker",
      command: { type: "BATTERY_COMMAND", battery: 2 },
    },
    {
      playerId: "defender",
      command: { type: "BATTERY_COMMAND", battery: 1 },
    },
  ];

  const result = battleFlow(lastState, commands);
  const snapShotPath = path.join(__dirname, "battle-flow__continue-game.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});

test("攻撃で防御側のHPを0以下にした場合、ゲームが終了する", () => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "attacker",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: 3000,
      maxHp: 3000,
      power: 2000,
      battery: 4,
      maxBattery: 5,
    },
  };
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "defender",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: 100,
      maxHp: 3000,
      power: 2000,
      battery: 5,
      maxBattery: 5,
    },
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: "attacker",
    players: [attacker, defender],
  };
  const commands = [
    {
      playerId: "attacker",
      command: { type: "BATTERY_COMMAND", battery: 2 },
    },
    {
      playerId: "defender",
      command: { type: "BATTERY_COMMAND", battery: 1 },
    },
  ];

  const result = battleFlow(lastState, commands);
  const snapShotPath = path.join(__dirname, "battle-flow__death.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});

test("ダメージ反射でHPが0になった場合は引き分け", () => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "attacker",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: 3000,
      maxHp: 3000,
      power: 2000,
      battery: 4,
      maxBattery: 5,
    },
  };
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "defender",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: 3000,
      maxHp: 3000,
      power: 2000,
      battery: 5,
      maxBattery: 5,
      effects: [
        {
          type: "TryReflect",
          damage: 5000,
          effect: "Lightning",
          period: {
            type: "TurnLimit",
            remainingTurn: 1,
          },
        },
      ],
    },
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: "attacker",
    players: [attacker, defender],
  };
  const commands = [
    {
      playerId: "attacker",
      command: { type: "BATTERY_COMMAND", battery: 2 },
    },
    {
      playerId: "defender",
      command: { type: "BATTERY_COMMAND", battery: 0 },
    },
  ];

  const result = battleFlow(lastState, commands);
  const snapShotPath = path.join(__dirname, "battle-flow__draw.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});
