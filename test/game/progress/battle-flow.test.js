// @flow

import * as path from "path";

import { battleFlow } from "../../../src/game/progress/battle-flow";
import {
  exportSnapShotJSON,
  importSnapShotJSON,
  shouldUpdateSnapShot,
} from "../../snap-shot";
import * as ContinuesGameData from "./battle-flow__continue-game.data";
import * as DeathData from "./battle-flow__death.data";
import * as DrawData from "./battle-flow__draw.data";

test("戦闘したが、相手を倒しきれなかったのでゲーム続行", () => {
  const { lastState, commands } = ContinuesGameData;
  const result = battleFlow(lastState, commands);
  const snapShotPath = path.join(__dirname, "battle-flow__continue-game.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});

test("攻撃で防御側のHPを0以下にした場合、ゲームが終了する", () => {
  const { lastState, commands } = DeathData;
  const result = battleFlow(lastState, commands);
  const snapShotPath = path.join(__dirname, "battle-flow__death.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});

test("ダメージ反射でHPが0になった場合は引き分け", () => {
  const { lastState, commands } = DrawData;
  const result = battleFlow(lastState, commands);
  const snapShotPath = path.join(__dirname, "battle-flow__draw.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});
