import { getRecoverBattery } from "../../src/effect/get-recover-battery";
import { EMPTY_ARMDOZER_STATE } from "../../src/empty/armdozer";
import { EMPTY_PLAYER_STATE } from "../../src/empty/player";
import { PlayerState } from "../../src/state/player-state";

/**
 * プレイヤーステートを生成する
 * @param battery 現在のバッテリー値
 * @returns プレイヤーステート
 */
const createPlayer = (battery: number): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery,
  },
});

test("バッテリーを回復できる", () => {
  expect(getRecoverBattery(createPlayer(1), 3)).toBe(4);
});

test("最大値を超えてバッテリーは回復しない", () => {
  expect(getRecoverBattery(createPlayer(3), 3)).toBe(5);
});
