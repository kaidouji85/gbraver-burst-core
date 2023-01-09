import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { gameEndJudging } from "../../../src/game/end-judging";
import type { PlayerId } from "../../../src/player/player";
import type { GameState } from "../../../src/state/game-state";
import type { PlayerState } from "../../../src/state/player-state";

/**
 * テストプレイヤーを生成するヘルパー関数
 * @param playerId プレイヤーID
 * @param hp HP
 * @return 生成結果
 */
function createPlayer(playerId: PlayerId, hp: number): PlayerState {
  return {
    ...EMPTY_PLAYER_STATE,
    playerId,
    armdozer: { ...EMPTY_ARMDOZER_STATE, hp },
  };
}

test("1人だけHPが0なら、HPが0より大きいプレイヤーの勝ち", () => {
  const player1 = createPlayer("player1", 0);
  const player2 = createPlayer("player2", 1000);
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [player1, player2],
  };
  const result = gameEndJudging(lastState);
  expect(result).toEqual({
    type: "GameOver",
    winner: "player2",
  });
});

test("2人ともHPが0なら引き分け", () => {
  const player1 = createPlayer("player1", 0);
  const player2 = createPlayer("player2", 0);
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [player1, player2],
  };
  const result = gameEndJudging(lastState);
  expect(result).toEqual({
    type: "EvenMatch",
  });
});

test("2人ともHPが0よりも大きければゲーム続行", () => {
  const player1 = createPlayer("player1", 1000);
  const player2 = createPlayer("player2", 1000);
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [player1, player2],
  };
  const result = gameEndJudging(lastState);
  expect(result).toEqual({
    type: "GameContinue",
  });
});
