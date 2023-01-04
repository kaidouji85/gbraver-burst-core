import { EMPTY_GAME_STATE } from "../../src";
import { startGameStateFlow } from "../../src/game/game-state-flow";
const state1 = { ...EMPTY_GAME_STATE,
  activePlayerId: "state1"
};
const state2 = { ...EMPTY_GAME_STATE,
  activePlayerId: "state2"
};
const state3 = { ...EMPTY_GAME_STATE,
  activePlayerId: "state3"
};
const state4 = { ...EMPTY_GAME_STATE,
  activePlayerId: "state4"
};
const state5 = { ...EMPTY_GAME_STATE,
  activePlayerId: "state5"
};
test("ゲームステートフロー開始直後は、初期ステート履歴そのまま", () => {
  const result = startGameStateFlow([state1, state2, state3]).toGameStateHistory();
  expect(result).toEqual([state1, state2, state3]);
});
test("ゲームステート履歴を正しく追加することができる", () => {
  const result = startGameStateFlow([state1, state2]).add(() => [state3, state4]).add(() => [state5]).toGameStateHistory();
  expect(result).toEqual([state1, state2, state3, state4, state5]);
});
test("ゲームステート追加関数の引数には、最新ステートがセットされる", () => {
  startGameStateFlow([state1, state2]).add(state => {
    expect(state).toEqual(state2);
    return [];
  });
});
test("空のゲームステート履歴でフローを開始すると、例外が発生する", () => {
  expect(() => {
    startGameStateFlow([]);
  }).toThrow();
});