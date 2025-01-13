import { reflect } from "../../../effect/reflect";
import { ReflectParam } from "../../../effect/reflect/reflect";
import { toReflectParam } from "../../../effect/reflect/to-reflect-param";
import { PlayerId } from "../../../player/player";
import { GameState } from "../../../state/game-state";

/**
 * ダメージ反射フロー
 * ダメージ反射効果が適用されている場合、ダメージ反射を行う
 * それ以外の場合は何もせずに、空の配列を返す
 * @param lastState 最新のゲームステート
 * @param attackerId 攻撃側のプレイヤーID
 * @returns 更新結果
 */
export function reflectFlow(
  lastState: GameState,
  attackerId: PlayerId,
): GameState[] {
  const defender = lastState.players.find((v) => v.playerId !== attackerId);
  if (!defender) {
    throw new Error("not found defender");
  }

  const reflectParams = defender.armdozer.effects
    .filter((v) => v.type === "TryReflect")
    .map((v) => toReflectParam(v));
  return reflectParams.reduce(
    (stateHistory: GameState[], reflectParam: ReflectParam) => {
      const state = stateHistory.at(-1) ?? lastState;
      return [...stateHistory, reflect(state, attackerId, reflectParam)];
    },
    [],
  );
}
