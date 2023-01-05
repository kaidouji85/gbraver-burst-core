import { EMPTY_ARMDOZER_STATE } from "../../src/empty/armdozer";
import { EMPTY_PLAYER_STATE } from "../../src/empty/player";
import type { PlayerState } from "../../src/state/player-state";
import { isPlayerDeath } from "../../src/state/player-state";

test("HPが0の場合、死亡したと判定する", () => {
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: { ...EMPTY_ARMDOZER_STATE, hp: 0 },
  };
  expect(isPlayerDeath(defender)).toBe(true);
});

test("HPが0より小さい場合、死亡したと判定する", () => {
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: { ...EMPTY_ARMDOZER_STATE, hp: -1000 },
  };
  expect(isPlayerDeath(defender)).toBe(true);
});

test("HPが0より大きい場合、死亡していない", () => {
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: { ...EMPTY_ARMDOZER_STATE, hp: 1000 },
  };
  expect(isPlayerDeath(defender)).toBe(false);
});
