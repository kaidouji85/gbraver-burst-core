import { PlayerCommand, RestoreGBraverBurstSchema } from "../../src";
import { EMPTY_ARMDOZER } from "../../src/empty/armdozer";
import { EMPTY_PILOT } from "../../src/empty/pilot";
import { restoreGBraverBurst, startGBraverBurst } from "../../src/game";
import type { Player } from "../../src/player/player";

/** プレイヤー1 */
const PLAYER1: Player = {
  playerId: "player1",
  pilot: EMPTY_PILOT,
  armdozer: { ...EMPTY_ARMDOZER, speed: 1600 },
};

/** プレイヤー2 */
const PLAYER2: Player = {
  playerId: "player2",
  pilot: EMPTY_PILOT,
  armdozer: { ...EMPTY_ARMDOZER, speed: 2000 },
};

/** プレイヤー1のコマンド */
const COMMAND1: PlayerCommand = {
  playerId: "player1",
  command: {
    type: "BATTERY_COMMAND",
    battery: 3,
  },
};

/** プレイヤー2のコマンド */
const COMMAND2: PlayerCommand = {
  playerId: "player2",
  command: {
    type: "BATTERY_COMMAND",
    battery: 2,
  },
};

test("初期状態を正しく作ることができる", () => {
  const core = startGBraverBurst([PLAYER1, PLAYER2]);
  const result = core.stateHistory();
  expect(result).toMatchSnapshot("initial-state");
});

test("プレイヤー情報が正しくセットされている", () => {
  const core = startGBraverBurst([PLAYER1, PLAYER2]);
  const result = core.players();
  const expected = [PLAYER1, PLAYER2];
  expect(result).toEqual(expected);
});

test("正しくゲームを進めることができる", () => {
  const core = startGBraverBurst([PLAYER1, PLAYER2]);
  const result = core.progress([COMMAND1, COMMAND2]);
  expect(result).toMatchSnapshot("progress");
});

test("ゲームに参加しているプレイヤーのコマンドが存在しない場合、例外が発生する", () => {
  const core = startGBraverBurst([PLAYER1, PLAYER2]);
  expect(() => {
    core.progress([COMMAND1, { ...COMMAND2, playerId: "no-exist-player" }]);
  }).toThrow();
});

test("ステートヒストリーが空の場合にprogressを呼ぶと、例外が発生する", () => {
  const core = restoreGBraverBurst({
    players: [PLAYER1, PLAYER2],
    stateHistory: [],
  });
  expect(() => {
    core.progress([COMMAND1, COMMAND2]);
  }).toThrow();
});

test("ゲームステート履歴が正しく更新される", () => {
  const core = startGBraverBurst([PLAYER1, PLAYER2]);
  const initialState = core.stateHistory();
  const update = core.progress([COMMAND1, COMMAND2]);
  const result = core.stateHistory();
  const expected = [...initialState, ...update];
  expect(result).toEqual(expected);
});

test("ダンプ、リストアを正しく行うことができる", () => {
  const core = startGBraverBurst([PLAYER1, PLAYER2]);
  core.progress([COMMAND1, COMMAND2]);
  const dump = core.dump();
  const str = JSON.stringify(dump);
  const parsedJSON = JSON.parse(str);
  const data = RestoreGBraverBurstSchema.parse(parsedJSON);
  const restoreCore = restoreGBraverBurst(data);
  expect(core.players()).toEqual(restoreCore.players());
  expect(core.stateHistory()).toEqual(restoreCore.stateHistory());
});
