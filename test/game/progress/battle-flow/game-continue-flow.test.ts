import {
  ArmdozerEffect,
  BatteryCommand,
  EMPTY_ARMDOZER_STATE,
  EMPTY_GAME_STATE,
  EMPTY_PLAYER_STATE,
  GameState,
  PlayerState,
} from "../../../../src";
import { gameContinueFlow } from "../../../../src/game/progress/battle-flow/game-continue-flow";

/**
 * プレイヤー1を生成する
 * @param battery バッテリー
 * @param effects アームドーザ効果
 * @return 生成結果
 */
const createPlayer1 = (battery: number, effects: ArmdozerEffect[]) => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "player1",
  armdozer: { ...EMPTY_ARMDOZER_STATE, maxBattery: 5, battery, effects },
});

/** プレイヤー1が選択したコマンド */
const player1Command: BatteryCommand = {
  type: "BATTERY_COMMAND",
  battery: 1,
};

/** プレイヤー2 */
const player2: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "player2" };

/** プレイヤー2が選択したコマンド */
const player2Command: BatteryCommand = {
  type: "BATTERY_COMMAND",
  battery: 2,
};

test("ゲーム継続フロー（ターン交代）を正しく処理することができる", () => {
  const player1 = createPlayer1(1, []);
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
  const player1 = createPlayer1(3, [
    {
      type: "ContinuousActivePlayer",
      period: {
        type: "SpecialPeriod",
      },
    },
  ]);
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
