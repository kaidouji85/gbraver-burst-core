import type { Player } from "../player/player";
import type { GameState } from "../state/game-state";
import type { PlayerCommand } from "./command/player-command";
import { progress } from "./progress";
import { RestoreGBraverBurst } from "./restore-gbraver-burst";
import { start } from "./start/start";
import { isAllPlayerEnteredCommand } from "./validation/is-all-player-entered-command";
import { isDuplicatePlayers } from "./validation/is-duplicate-players";
import { isValidCommand } from "./validation/is-valid-command";


/** Gブレイバーバーストコア */
export interface GBraverBurstCore {
  /**
   * バトルに参加している全プレイヤーを取得する
   * @return 取得結果
   */
  players(): [Player, Player];

  /**
   * ゲームステート履歴を取得する
   * @return 取得結果
   */
  stateHistory(): GameState[];

  /**
   * 現在の状態をダンプする
   * @return ダンプしたデータ
   */
  dump(): RestoreGBraverBurst;

  /**
   * ゲームを進行させる
   * @param commands コマンド
   * @return 更新されたゲーム状態
   */
  progress(commands: [PlayerCommand, PlayerCommand]): GameState[];
}

/** Gブレイバーバーストコア実装 */
class GBraverBurstCoreImpl implements GBraverBurstCore {
  #players: [Player, Player];
  #stateHistory: GameState[];

  /**
   * コンストラクタ
   *
   * @param players バトルに参加するプレイヤー
   * @param stateHistory ステートヒストリー
   */
  constructor(players: [Player, Player], stateHistory: GameState[]) {
    this.#players = players;
    this.#stateHistory = stateHistory;
  }

  /** @override */
  players(): [Player, Player] {
    return this.#players;
  }

  /** @override */
  stateHistory(): GameState[] {
    return this.#stateHistory;
  }

  /** @override */
  dump(): RestoreGBraverBurst {
    return {
      players: this.#players,
      stateHistory: this.#stateHistory,
    };
  }

  /** @override */
  progress(commands: [PlayerCommand, PlayerCommand]): GameState[] {
    if (!isAllPlayerEnteredCommand(this.#players, commands)) {
      throw new Error("all player not enter command");
    }

    const lastState = this.#stateHistory[this.#stateHistory.length - 1];
    if (!lastState) {
      throw new Error("no game state history");
    }

    const isValidCommands =
      lastState.effect.name === "InputCommand" &&
      isValidCommand(commands[0], lastState.effect) &&
      isValidCommand(commands[1], lastState.effect);
    if (!isValidCommands) {
      throw new Error("invalid commands");
    }

    const updated = progress(lastState, commands);
    this.#stateHistory = [...this.#stateHistory, ...updated];
    return updated;
  }
}

/**
 * Gブレイバーバーストを開始する
 * @param players プレイヤー情報
 * @return Gブレイバーバースト
 */
export function startGBraverBurst(players: [Player, Player]): GBraverBurstCore {
  if (isDuplicatePlayers(players)) {
    throw new Error("duplicate players");
  }

  const stateHistory = start(players);
  return new GBraverBurstCoreImpl(players, stateHistory);
}

/**
 * Gブレイバーバーストを再開する
 * @param data 再開するデータ
 * @return Gブレイバーバースト
 */
export function restoreGBraverBurst(
  data: RestoreGBraverBurst,
): GBraverBurstCore {
  return new GBraverBurstCoreImpl(data.players, data.stateHistory);
}