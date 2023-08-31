import { Player } from "../player/player";
import { GameState } from "../state/game-state";

/** ゲームを再開するためのデータ */
export type RestoreGBraverBurst = Readonly<{
  /** プレイヤー情報 */
  players: [Player, Player];
  /** ステートヒストリー */
  stateHistory: GameState[];
}>;
