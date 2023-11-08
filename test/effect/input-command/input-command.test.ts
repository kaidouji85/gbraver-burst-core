import { inputCommand } from "../../../src/effect/input-command";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";

test("戦闘後のコマンド入力フェイズが正しく適用される", () => {
  const player01 = {
    ...EMPTY_PLAYER_STATE,
    playerId: "player01",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 5,
      maxBattery: 5,
      enableBurst: true,
    },
  };
  const player02 = {
    ...EMPTY_PLAYER_STATE,
    playerId: "player02",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 3,
      maxBattery: 5,
      enableBurst: false,
    },
  };
  const result = inputCommand(
    { ...EMPTY_GAME_STATE, players: [player01, player02] },
    player01.playerId,
    {
      type: "BATTERY_COMMAND",
      battery: 3,
    },
    player02.playerId,
    {
      type: "BATTERY_COMMAND",
      battery: 3,
    },
  );
  expect(result).toMatchSnapshot("after-battle");
});

test("効果適用フロー後のコマンド入力フェイズ効果が正しく処理される", () => {
  const player01 = {
    ...EMPTY_PLAYER_STATE,
    playerId: "player01",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 2,
      maxBattery: 5,
      enableBurst: true,
    },
  };
  const player02 = {
    ...EMPTY_PLAYER_STATE,
    playerId: "player02",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 3,
      maxBattery: 5,
      enableBurst: false,
    },
  };
  const result = inputCommand(
    { ...EMPTY_GAME_STATE, players: [player01, player02] },
    player01.playerId,
    {
      type: "BATTERY_COMMAND",
      battery: 3,
    },
    player02.playerId,
    {
      type: "BURST_COMMAND",
    },
  );
  expect(result).toMatchSnapshot("after-effect-activation");
});
