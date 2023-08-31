import { z } from "zod";

import { Effect, EffectSchema } from "../effect";
import { PlayerId, PlayerIdSchema } from "../player/player";
import { PlayerState, PlayerStateSchema } from "./player-state";

/**
 * ゲームステート（型指定あり）
 * @template X 発生した効果
 */
export type GameStateX<X> = Readonly<{
  /** プレイヤー毎の状態 */
  players: PlayerState[];
  /** 攻撃側のプレイヤーのID */
  activePlayerId: PlayerId;
  /** このステップで発生した効果 */
  effect: X;
}>;

/** ゲームステート */
export type GameState = GameStateX<Effect>;

/** GameState zodスキーマ */
export const GameStateSchema = z.object({
  players: z.array(PlayerStateSchema),
  activePlayerId: PlayerIdSchema,
  effect: EffectSchema,
});