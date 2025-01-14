import { BatteryCommand } from "../../../../src/command/battery";
import { EMPTY_ARMDOZER_STATE } from "../../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../../src/empty/player";
import { PlayerCommandX } from "../../../../src/game/command/player-command";
import { battleFlow } from "../../../../src/game/progress/battle-flow";
import { PlayerId } from "../../../../src/player/player";
import { ArmdozerEffect } from "../../../../src/state/armdozer-effect";
import { ArmdozerEffectsDisabled } from "../../../../src/state/armdozer-effect/armdozer-effects-disabled";
import { BatteryCorrection } from "../../../../src/state/armdozer-effect/battery-correction";
import { CorrectPower } from "../../../../src/state/armdozer-effect/correct-power";
import { DamageHalved } from "../../../../src/state/armdozer-effect/damage-halved";
import { TryReflect } from "../../../../src/state/armdozer-effect/try-reflect";
import { PlayerState } from "../../../../src/state/player-state";

/** 攻撃補正 */
const correctPower: CorrectPower = {
  type: "CorrectPower",
  power: 1000,
  period: { type: "TurnLimit", remainingTurn: 1 },
};

/** バッテリー補正 */
const batteryCorrection: BatteryCorrection = {
  type: "BatteryCorrection",
  batteryCorrection: 1,
  period: { type: "TurnLimit", remainingTurn: 1 },
};

/** ダメージ反射 */
const tryReflect: TryReflect = {
  type: "TryReflect",
  damage: 5000,
  effect: "Lightning",
  period: { type: "TurnLimit", remainingTurn: 1 },
};

/** ダメージ半減 */
const damageHalved: DamageHalved = {
  type: "DamageHalved",
  period: { type: "TurnLimit", remainingTurn: 1 },
};

/** 効果無効 */
const armdozerEffectsDisabled: ArmdozerEffectsDisabled = {
  type: "ArmdozerEffectsDisabled",
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

/** 最新ステート生成オプション */
type LastStateOptions = {
  /** 攻撃側プレイヤー */
  attacker: PlayerState;
  /** 防御側プレイヤー */
  defender: PlayerState;
};

/**
 * 最新ゲームステートを生成する
 * @param options 生成オプション
 * @returns 最新ゲームスート
 */
const createLastState = (options: LastStateOptions) => {
  const { attacker, defender } = options;
  return {
    ...EMPTY_GAME_STATE,
    activePlayerId: attacker.playerId,
    players: [attacker, defender],
  };
};

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
  const lastState = createLastState({ attacker, defender });
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
  const lastState = createLastState({ attacker, defender });
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
  const lastState = createLastState({ attacker, defender });
  expect(
    battleFlow(lastState, [
      createBatteryCommand(attacker.playerId, 2),
      createBatteryCommand(defender.playerId, 0),
    ]),
  ).toMatchSnapshot("draw");
});

test("攻撃側に効果無視が適用されている場合、すべての攻撃側効果を無視して戦闘を行う", () => {
  const attacker = createPlayer({
    playerId: "attacker",
    hp: 3000,
    battery: 4,
    effects: [armdozerEffectsDisabled, correctPower, batteryCorrection],
  });
  const defender = createPlayer({
    playerId: "defender",
    hp: 3000,
    battery: 5,
    effects: [batteryCorrection, tryReflect, damageHalved],
  });
  const lastState = createLastState({ attacker, defender });
  expect(
    battleFlow(lastState, [
      createBatteryCommand(attacker.playerId, 2),
      createBatteryCommand(defender.playerId, 1),
    ]),
  ).toMatchSnapshot("attacker-effects-disabled");
});

test("防御側に効果無視が適用されている場合、すべての防御側効果を無視して戦闘を行う", () => {
  const attacker = createPlayer({
    playerId: "attacker",
    hp: 3000,
    battery: 4,
    effects: [correctPower, batteryCorrection],
  });
  const defender = createPlayer({
    playerId: "defender",
    hp: 3000,
    battery: 5,
    effects: [
      armdozerEffectsDisabled,
      batteryCorrection,
      tryReflect,
      damageHalved,
    ],
  });
  const lastState = createLastState({ attacker, defender });
  expect(
    battleFlow(lastState, [
      createBatteryCommand(attacker.playerId, 2),
      createBatteryCommand(defender.playerId, 1),
    ]),
  ).toMatchSnapshot("defender-effects-disabled");
});
