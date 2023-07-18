import { EMPTY_ARMDOZER_STATE, EMPTY_PLAYER_STATE } from "../../../src";
import { calcTurnChangeRecoverBattery } from "../../../src/effect/turn-change/recover-battery";

const createPlayer = (battery: number) => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "player1",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery,
    maxBattery: 5,
  },
});

test("回復量だけバッテリーに追加される", () => {
  const player = createPlayer(1);
  expect(calcTurnChangeRecoverBattery(player)).toEqual({
    battery: 4,
    recoverBattery: 3,
  });
});

test("バッテリー最大値以上にはならない", () => {
  expect(calcTurnChangeRecoverBattery(createPlayer(4))).toEqual({
    battery: 5,
    recoverBattery: 3,
  });
});
