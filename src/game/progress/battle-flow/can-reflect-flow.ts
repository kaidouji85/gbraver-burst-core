import { Battle } from "../../../effect/battle/battle";
import { isAttackHit } from "../../../effect/battle/result/is-attack-hit";
import { hasArmdozerEffectsDisabled } from "../../../effect/has-armdozer-effects-disabled";
import { PlayerState } from "../../../state/player-state";

/**
 * ダメージ反射フロー実施判定のオプション
 * 戦闘を行ったGameStateから必要なプロパティを抜き出したものである
 */
type Options = {
  /** 戦闘結果 */
  effect: Battle;
  /** 戦闘直後のプレイヤー情報 */
  players: PlayerState[];
};

/**
 * ダメージ反射フローを実施するか否かを判定する
 * @param options オプション
 */
export function canReflectFlow(options: Options) {
  const { effect, players } = options;
  const attacker = players.find((v) => v.playerId === effect.attacker);
  if (!attacker) {
    throw new Error("not found attacker");
  }

  return (
    !hasArmdozerEffectsDisabled(attacker.armdozer.effects) &&
    isAttackHit(effect.result)
  );
}
