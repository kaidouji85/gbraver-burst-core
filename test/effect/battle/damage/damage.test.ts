import { normalHitDamage } from "../../../../src/effect/battle/damage/damage";
import { EMPTY_CORRECT_POWER } from "../../../../src/empty/amrdozer-effect";
import { EMPTY_ARMDOZER_STATE } from "../../../../src/empty/armdozer";
import { EMPTY_PLAYER_STATE } from "../../../../src/empty/player";
import type { PlayerState } from "../../../../src/state/player-state";

test("ダメージ = 攻撃力  + 攻撃力補正 +　バッテリーボーナス", () => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "player1",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      power: 2000,
      effects: [{ ...EMPTY_CORRECT_POWER, power: 1000 }],
    },
  };
  const defender: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "player2" };
  expect(normalHitDamage(attacker, 5, defender, 2)).toBe(3200);
});
