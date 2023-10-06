import {
  BatteryCommand,
  EMPTY_ARMDOZER_STATE,
  EMPTY_GAME_STATE,
  EMPTY_PLAYER_STATE,
  GameState,
  PlayerState,
} from "../../../../src";
import { gameContinueFlow } from "../../../../src/game/progress/battle-flow/game-continue-flow";

test("ターン交代まで正しく実行できる", () => {
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
  const result = gameContinueFlow(
    lastState,
    player1.playerId,
    player1Command,
    player2.playerId,
    player2Command,
  );
  expect(result).toMatchSnapshot("turn-change");
});

test("アクティブプレイヤー継続を正しく処理できる", () => {
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
  const result = gameContinueFlow(
    lastState,
    player1.playerId,
    player1Command,
    player2.playerId,
    player2Command,
  );
  expect(result).toMatchSnapshot("continuous-active");
});
