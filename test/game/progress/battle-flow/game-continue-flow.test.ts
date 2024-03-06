import {
  BatteryCommand,
  EMPTY_ARMDOZER_STATE,
  EMPTY_GAME_STATE,
  EMPTY_PLAYER_STATE,
  GameState,
  PlayerState,
} from "../../../../src";
import { gameContinueFlow } from "../../../../src/game/progress/battle-flow/game-continue-flow";

test("ゲーム継続フロー（ターン交代）を正しく処理することができる", () => {
  const player1 = {
    ...EMPTY_PLAYER_STATE,
    playerId: "player1",
    armdozer: { ...EMPTY_ARMDOZER_STATE, maxBattery: 5, battery: 1 },
  };
  const player1Command: BatteryCommand = {
    type: "BATTERY_COMMAND",
    battery: 1,
  };
  const player2 = { ...EMPTY_PLAYER_STATE, playerId: "player2" };
  const player2Command: BatteryCommand = {
    type: "BATTERY_COMMAND",
    battery: 2,
  };
  const lastState = {
    ...EMPTY_GAME_STATE,
    players: [player1, player2],
    activePlayerId: player2.playerId,
  };

  expect(
    gameContinueFlow(
      lastState,
      player1.playerId,
      player1Command,
      player2.playerId,
      player2Command,
    ),
  ).toMatchSnapshot("turn-change");
});

test("ゲーム継続フロー（アクティブプレイヤー継続）を正しく処理することができる", () => {
  const player1: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "player1",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      maxBattery: 5,
      battery: 3,
      effects: [
        {
          type: "ContinuousActivePlayer",
          period: {
            type: "SpecialPeriod",
          },
        },
      ],
    },
  };
  const player1Command: BatteryCommand = {
    type: "BATTERY_COMMAND",
    battery: 1,
  };
  const player2: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "player2" };
  const player2Command: BatteryCommand = {
    type: "BATTERY_COMMAND",
    battery: 2,
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [player1, player2],
    activePlayerId: player1.playerId,
  };

  expect(
    gameContinueFlow(
      lastState,
      player1.playerId,
      player1Command,
      player2.playerId,
      player2Command,
    ),
  ).toMatchSnapshot("continuous-active");
});
