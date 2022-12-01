// @flow
import path from "path";

import { EMPTY_GAME_STATE, EMPTY_PLAYER_STATE } from "../../../../src";
import { attackFlow } from "../../../../src/game/progress/battle-flow/attack-flow";
import {
  exportSnapShotJSON,
  importSnapShotJSON,
  shouldUpdateSnapShot,
} from "../../../snap-shot";

test("バッテリー宣言から攻撃までを正しく進めることができる", () => {
  const attacker = { ...EMPTY_PLAYER_STATE, playerId: "attacker" };
  const attackerBattery = {
    playerId: attacker.playerId,
    command: { type: "BATTERY_COMMAND", battery: 3 },
  };
  const defender = { ...EMPTY_PLAYER_STATE, playerId: "player2" };
  const defenderBattery = {
    playerId: defender.playerId,
    command: { type: "BATTERY_COMMAND", battery: 2 },
  };
  const lastState = {
    ...EMPTY_GAME_STATE,
    players: [attacker, defender],
    activePlayerId: attacker.playerId,
  };
  const result = attackFlow(lastState, attackerBattery, defenderBattery);
  const snapShotPath = path.join(__dirname, "attack-flow.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});
