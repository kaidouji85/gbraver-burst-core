import { BatteryCommand } from "../../../../src/command/battery";
import { EMPTY_ARMDOZER_STATE } from "../../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../../src/empty/player";
import { PlayerCommandX } from "../../../../src/game/command/player-command";
import { battleFlow } from "../../../../src/game/progress/battle-flow";
import { PlayerId } from "../../../../src/player/player";
import { ArmdozerEffect } from "../../../../src/state/armdozer-effect";
import { TryReflect } from "../../../../src/state/armdozer-effect/try-reflect";
import { PlayerState } from "../../../../src/state/player-state";

/** ダメージ反射 */
const tryReflect: TryReflect = {
  type: "TryReflect",
  damage: 5000,
  effect: "Lightning",
  period: { type: "TurnLimit", remainingTurn: 1 },
};

/** プレイヤー生成オプション */
type AttackerOptions = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** HP */
  hp: number;
  /** バッテリー */
  battery: number;
  /** 適用中の効果 */
  effects: ArmdozerEffect[];
};

/**
 * プレイヤーを生成する
 * @param options 生成オプション
 * @returns プレイヤー
 */
const createPlayer = (options: AttackerOptions): PlayerState => {
  const { playerId, hp, battery, effects } = options;
  return {
    ...EMPTY_PLAYER_STATE,
    playerId,
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp,
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
const createBatteryCommand = (
  playerId: PlayerId,
  battery: number,
): PlayerCommandX<BatteryCommand> => ({
  playerId,
  command: { type: "BATTERY_COMMAND", battery },
});

test("戦闘したが、相手を倒しきれなかったのでゲーム続行", () => {
  const attacker = createPlayer({
    playerId: "attacker",
    hp: 3000,
    battery: 4,
    effects: [],
  });
  const defender = createPlayer({
    playerId: "defender",
    hp: 3000,
    battery: 5,
    effects: [],
  });
  const lastState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: attacker.playerId,
    players: [attacker, defender],
  };
  expect(
    battleFlow(lastState, [
      createBatteryCommand(attacker.playerId, 2),
      createBatteryCommand(defender.playerId, 1),
    ]),
  ).toMatchSnapshot("continue-game");
});

test("攻撃で防御側のHPを0以下にした場合、ゲームが終了する", () => {
  const attacker = createPlayer({
    playerId: "attacker",
    hp: 3000,
    battery: 4,
    effects: [],
  });
  const defender = createPlayer({
    playerId: "defender",
    hp: 100,
    battery: 5,
    effects: [],
  });
  const lastState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: attacker.playerId,
    players: [attacker, defender],
  };
  expect(
    battleFlow(lastState, [
      createBatteryCommand(attacker.playerId, 2),
      createBatteryCommand(defender.playerId, 1),
    ]),
  ).toMatchSnapshot("death");
});

test("ダメージ反射でHPが0になった場合は引き分け", () => {
  const attacker = createPlayer({
    playerId: "attacker",
    hp: 3000,
    battery: 4,
    effects: [],
  });
  const defender = createPlayer({
    playerId: "defender",
    hp: 3000,
    battery: 5,
    effects: [tryReflect],
  });
  const lastState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: attacker.playerId,
    players: [attacker, defender],
  };
  expect(battleFlow(lastState, [
    createBatteryCommand(attacker.playerId, 2),
    createBatteryCommand(defender.playerId, 0),
  ])).toMatchSnapshot("draw");
});
