import type { PlayerId } from "../../player/player";
import type { ArmdozerEffect } from "../../state/armdozer-effect/armdozer-effect";

/** 終了したアームドーザ効果 */
export type EndArmdozerEffect = Readonly<{
  /** プレイヤーID */
  playerId: PlayerId;
  /** 終了したエフェクト */
  effect: ArmdozerEffect;
}>;

/** 効果継続ターン数を更新する */
export type UpdateRemainingTurn = Readonly<{
  name: "UpdateRemainingTurn";
  /** 終了したアームドーザ効果 */
  endArmdozerEffects: EndArmdozerEffect[];
}>;
