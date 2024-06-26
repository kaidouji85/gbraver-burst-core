import { PlayerId } from "../../player/player";
import { GameState, GameStateX } from "../../state/game-state";
import { isPlayerDeath } from "../../state/player-state/is-player-death";
import { Reflect, ReflectParam } from "./reflect";
import { reflectDamage } from "./reflect-damage";

/**
 * ダメージ反射を実行する
 * 実行できない場合はnullを返す
 *
 * @param lastState 最新状態
 * @param damagedPlayerId ダメージを受けるプレイヤー
 * @param reflect ダメージ反射パラメータ
 * @returns 更新結果
 */
export function reflect(
  lastState: GameState,
  damagedPlayerId: PlayerId,
  reflect: ReflectParam,
): GameStateX<Reflect> {
  const target = lastState.players.find((v) => v.playerId === damagedPlayerId);

  if (!target) {
    throw new Error("not found reflect target");
  }

  const damage = reflectDamage(reflect, target);
  const updatedTarget = {
    ...target,
    armdozer: { ...target.armdozer, hp: target.armdozer.hp - damage },
  };
  const updatedPlayers = lastState.players.map((v) =>
    v.playerId === updatedTarget.playerId ? updatedTarget : v,
  );
  const effect: Reflect = {
    name: "Reflect",
    damagedPlayer: damagedPlayerId,
    damage: damage,
    effect: reflect.effect,
    isDeath: isPlayerDeath(updatedTarget),
  };
  return { ...lastState, players: updatedPlayers, effect: effect };
}
