import { PlayerState } from "../../../state/player-state";

/**
 * アームドーザ効果無効であるかを判定する
 * @param player 判定対象のプレイヤー
 * @returns 判定結果、trueでアームドーザ効果無効
 */
export const hasArmdozerEffectsDisabled = (player: PlayerState) =>
  player.armdozer.effects.some(
    (effect) => effect.type === "ArmdozerEffectsDisabled",
  );
