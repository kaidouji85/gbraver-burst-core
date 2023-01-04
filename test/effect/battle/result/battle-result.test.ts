import { battleResult } from "../../../../src/effect/battle/result/battle-result";
import { EMPTY_PLAYER_STATE } from "../../../../src/empty/player";
import type { PlayerState } from "../../../../src/state/player-state";
const ATTACKER: PlayerState = { ...EMPTY_PLAYER_STATE,
  playerId: "player1"
};
const DEFENDER: PlayerState = { ...EMPTY_PLAYER_STATE,
  playerId: "player2"
};
test("防御バッテリー < 攻撃バッテリー なら攻撃ヒット", () => {
  const result = battleResult(ATTACKER, 3, DEFENDER, 2);
  expect(result.name).toBe("NormalHit");
});
test("防御バッテリー = 攻撃バッテリー なら防御", () => {
  const result = battleResult(ATTACKER, 3, DEFENDER, 3);
  expect(result.name).toBe("Guard");
});
test("攻撃バッテリー < 防御バッテリー  ならミス", () => {
  const result = battleResult(ATTACKER, 1, DEFENDER, 3);
  expect(result.name).toBe("Miss");
});
test("攻撃バッテリーが1以上 and 防御バッテリーが0 ならクリティカルヒット", () => {
  const result = battleResult(ATTACKER, 4, DEFENDER, 0);
  expect(result.name).toBe("CriticalHit");
});
test("攻撃バッテリーが0ならフェイント", () => {
  const result = battleResult(ATTACKER, 0, DEFENDER, 0);
  expect(result.name).toBe("Feint");
});