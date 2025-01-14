import { BatteryCommand } from "../../../../src/command/battery";
import { EMPTY_ARMDOZER_STATE } from "../../../../src/empty/armdozer";
import { EMPTY_PLAYER_STATE } from "../../../../src/empty/player";
import { PlayerCommandX } from "../../../../src/game/command/player-command";
import { battleFlow } from "../../../../src/game/progress/battle-flow";
import { PlayerId } from "../../../../src/player/player";
import { ArmdozerEffect } from "../../../../src/state/armdozer-effect";
import { PlayerState } from "../../../../src/state/player-state";
import * as ContinuesGameData from "./battle-flow__continue-game.data";
import * as DeathData from "./battle-flow__death.data";
import * as DrawData from "./battle-flow__draw.data";

/** プレイヤー生成オプション */
type AttackerOptions = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** バッテリー */
  battery: number;
  /** 適用中の効果 */
  effects: ArmdozerEffect[];
};

/**
 * 攻撃側プレイヤーを生成する
 * @param options 生成オプション
 * @returns 攻撃側プレイヤー
 */
const createAttakcer = (options: AttackerOptions): PlayerState => {
  const { playerId, battery, effects } = options;
  return {
    ...EMPTY_PLAYER_STATE,
    playerId,
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: 3000,
      maxHp: 3000,
      power: 2000,
      battery,
      maxBattery: 5,
      effects,
    },
  };
};

/**
 * バッテリーコマンドを生成する
 * @param playerId プレイヤーID
 * @param battery バッテリー値
 * @returns バッテリーコマンド
 */
const createBatteryCommand = (playerId: PlayerId, battery: number): PlayerCommandX<BatteryCommand> => ({
  playerId,
  command: { type: "BATTERY_COMMAND", battery },
});


test("戦闘したが、相手を倒しきれなかったのでゲーム続行", () => {
  const { lastState, commands } = ContinuesGameData;
  const result = battleFlow(lastState, commands);
  expect(result).toMatchSnapshot("continue-game");
});

test("攻撃で防御側のHPを0以下にした場合、ゲームが終了する", () => {
  const { lastState, commands } = DeathData;
  const result = battleFlow(lastState, commands);
  expect(result).toMatchSnapshot("death");
});

test("ダメージ反射でHPが0になった場合は引き分け", () => {
  const { lastState, commands } = DrawData;
  const result = battleFlow(lastState, commands);
  expect(result).toMatchSnapshot("draw");
});
