import path from "path";

import { PlayerCommand } from "../../src";
import { EMPTY_ARMDOZER } from "../../src/empty/armdozer";
import { EMPTY_PILOT } from "../../src/empty/pilot";
import {
  restoreGBraverBurst,
  startGBraverBurst,
} from "../../src/game";
import type { Player } from "../../src/player/player";
import {
  exportSnapShotJSON,
  importSnapShotJSON,
  shouldUpdateSnapShot,
} from "../snap-shot";

const PLAYER1: Player = {
  playerId: "player1",
  pilot: EMPTY_PILOT,
  armdozer: { ...EMPTY_ARMDOZER, speed: 1600 },
};
const PLAYER2: Player = {
  playerId: "player2",
  pilot: EMPTY_PILOT,
  armdozer: { ...EMPTY_ARMDOZER, speed: 2000 },
};
const COMMAND1: PlayerCommand = {
  playerId: "player1",
  command: {
    type: "BATTERY_COMMAND",
    battery: 3,
  },
};
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
  const snapShotPath = path.join(
    __dirname,
    "gbraver-burst-core__initial-state.json",
  );
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
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
  const snapShotPath = path.join(
    __dirname,
    "gbraver-burst-core__progress.json",
  );
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
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
  const data = core.dump();
  const restoreCore = restoreGBraverBurst(data);
  expect(core.players()).toEqual(restoreCore.players());
  expect(core.stateHistory()).toEqual(restoreCore.stateHistory());
});
