import path from "path";
import type { GameState, PlayerState } from "../../../src";
import { pilotSkill } from "../../../src/effect/pilot-skill";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PILOT } from "../../../src/empty/pilot";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import type { DamageHalvedSkill } from "../../../src/player/pilot";
import { exportSnapShotJSON, importSnapShotJSON, shouldUpdateSnapShot } from "../../snap-shot";
test("ダメージ半減スキルが正しく発動できる", () => {
  const skill: DamageHalvedSkill = {
    type: "DamageHalvedSkill",
    duration: 1
  };
  const invoker: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "invoker",
    armdozer: { ...EMPTY_PLAYER_STATE.armdozer,
      effects: []
    },
    pilot: { ...EMPTY_PILOT,
      skill,
      enableSkill: true
    }
  };
  const other: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "other"
  };
  const state: GameState = { ...EMPTY_GAME_STATE,
    activePlayerId: invoker.playerId,
    players: [other, invoker]
  };
  const result = pilotSkill(state, invoker.playerId);
  const snapShotPath = path.join(__dirname, "damage-halved-skill.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot() ? result : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});