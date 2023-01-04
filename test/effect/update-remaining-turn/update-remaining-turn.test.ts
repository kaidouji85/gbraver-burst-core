import path from "path";
import { updateRemainingTurn } from "../../../src/effect/update-remaning-turn";
import { exportSnapShotJSON, importSnapShotJSON, shouldUpdateSnapShot } from "../../snap-shot";
import * as Data from "./update-remaining-turn.data";
test("効果継続ターン更新が正しく処理される", () => {
  const {
    lastState
  } = Data;
  const result = updateRemainingTurn(lastState);
  const snapShotPath = path.join(__dirname, "update-remaining-turn.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});