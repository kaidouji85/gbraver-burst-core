import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import { isPlayerDeath } from "../../state/player-state";
import type { Reflect, ReflectParam } from "./reflect";
import { reflectDamage } from "./reflect";

/**
 * ダメージ反射を実行する
 * 実行できない場合はnullを返す
 *
 * @param lastState 最新状態
 * @param damagedPlayerId ダメージを受けるプレイヤー
 * @param reflect ダメージ反射パラメータ
 * @return 更新結果
 */
export function reflect(lastState: GameState, damagedPlayerId: PlayerId, reflect: ReflectParam): GameStateX<Reflect> {
  const target = lastState.players.find(v => v.playerId === damagedPlayerId);

  if (!target) {
    throw new Error("not found reflect target");
  }

  const damage = reflectDamage(reflect, target);
  const updatedTarget = { ...target,
    armdozer: { ...target.armdozer,
      hp: target.armdozer.hp - damage
    }
  };
  const updatedPlayers = lastState.players.map(v => v.playerId === updatedTarget.playerId ? updatedTarget : v);
  const effect: Reflect = {
    name: "Reflect",
    damagedPlayer: damagedPlayerId,
    damage: damage,
    effect: reflect.effect,
    isDeath: isPlayerDeath(updatedTarget)
  };
  return { ...lastState,
    players: updatedPlayers,
    effect: effect
  };
}