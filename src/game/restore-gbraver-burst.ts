import { z } from "zod";

import { Player, PlayerSchema } from "../player/player";
import { GameState, GameStateSchema } from "../state/game-state";

/** ゲームを再開するためのデータ */
export type RestoreGBraverBurst = Readonly<{
  /** プレイヤー情報 */
  players: [Player, Player];
  /** ステートヒストリー */
  stateHistory: GameState[];
}>;

/** RestoreGBraverBurst zodスキーマ */
export const RestoreGBraverBurstSchema = z.object({
  players: z.tuple([PlayerSchema, PlayerSchema]),
  stateHistory: z.array(GameStateSchema),
});
