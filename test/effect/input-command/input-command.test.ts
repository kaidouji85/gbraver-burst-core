import { BatteryCommand, BurstCommand, PlayerId } from "../../../src";
import { inputCommand } from "../../../src/effect/input-command";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";

/**
 * プレイヤーを生成する
 * @param playerId プレイヤーID
 * @param battery バッテリー
 * @param enableBurst バースト発動可能か否か、trueで発動可能
 * @returns 生成されたプレイヤー
 */
const createPlayer = (
  playerId: PlayerId,
  battery: number,
  enableBurst: boolean,
) => ({
  ...EMPTY_PLAYER_STATE,
  playerId,
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery,
    maxBattery: 5,
    enableBurst,
  },
});

/**
 * バッテリーコマンドを生成する
 * @param battery バッテリー
 * @returns 生成されたバッテリーコマンド
 */
const createBatteryCommand = (battery: number): BatteryCommand => ({
  type: "BATTERY_COMMAND",
  battery,
});

/** バーストコマンド */
const burstCommand: BurstCommand = {
  type: "BURST_COMMAND",
};

test("戦闘後のコマンド入力フェイズが正しく適用される", () => {
  const player01 = createPlayer("player01", 5, true);
  const player01Command = createBatteryCommand(3);
  const player02 = createPlayer("player02", 3, false);
  const player02Command = createBatteryCommand(3);
  const lastState = { ...EMPTY_GAME_STATE, players: [player01, player02] };

  expect(
    inputCommand(
      lastState,
      player01.playerId,
      player01Command,
      player02.playerId,
      player02Command,
    ),
  ).toMatchSnapshot("after-battle");
});

test("効果適用フロー後のコマンド入力フェイズ効果が正しく処理される", () => {
  const player01 = createPlayer("player01", 2, true);
  const player01Command = createBatteryCommand(3);
  const player02 = createPlayer("player02", 3, false);
  const player02Command = burstCommand;
  const lastState = { ...EMPTY_GAME_STATE, players: [player01, player02] };

  expect(
    inputCommand(
      lastState,
      player01.playerId,
      player01Command,
      player02.playerId,
      player02Command,
    ),
  ).toMatchSnapshot("after-effect-activation");
});
