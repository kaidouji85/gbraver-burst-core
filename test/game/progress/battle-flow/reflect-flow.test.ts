import path from "path";
import { reflectFlow } from "../../../../src/game/progress/battle-flow/reflect-flow";
import { exportSnapShotJSON, importSnapShotJSON, shouldUpdateSnapShot } from "../../../snap-shot";
import * as MultiReflectData from "./reflect-flow__multi-reflect.data";
import * as SingleReflectData from "./reflect-flow__single-reflect.data";
test("ダメージ反射が正しく適用される", () => {
  const {
    lastState
  } = SingleReflectData;
  const result = reflectFlow(lastState, "attacker");
  const snapShotPath = path.join(__dirname, "reflect-flow__single-reflect.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot() ? result : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});
test("ダメージ反射の重ね掛けも正しく処理される", () => {
  const {
    lastState
  } = MultiReflectData;
  const result = reflectFlow(lastState, "attacker");
  const snapShotPath = path.join(__dirname, "reflect-flow__multi-reflect.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot() ? result : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});