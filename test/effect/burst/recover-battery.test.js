// @flow

import type { GameState, RecoverBattery } from "../../../src";
import { recoverBattery } from "../../../src/effect/burst/recover-battery";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import type { PlayerState } from "../../../src/state/player-state";

test("削除 バースト効果バッテリー回復が正しく適用される", () => {
  const burstPlayer = {
    ...EMPTY_PLAYER_STATE,
    playerId: "player01",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 0,
      maxBattery: 5,
      enableBurst: true,
      burst: {
        type: "RecoverBattery",
        recoverBattery: 5,
      },
    },
  };
  const otherPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "player02",
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [otherPlayer, burstPlayer],
  };
  const burst: RecoverBattery = {
    type: "RecoverBattery",
    recoverBattery: 5,
  };

  const result = recoverBattery(lastState, burstPlayer.playerId, burst);
  const expected = {
    ...lastState,
    players: [
      otherPlayer,
      {
        ...burstPlayer,
        armdozer: {
          ...burstPlayer.armdozer,
          battery: 5,
        },
      },
    ],
    effect: {
      name: "BurstEffect",
      burstPlayer: burstPlayer.playerId,
      burst: burst,
    },
  };
  expect(result).toEqual(expected);
});
