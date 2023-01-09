import type { BattleResult } from "../../../effect/battle/result/battle-result";
import { reflect } from "../../../effect/reflect";
import type { ReflectParam } from "../../../effect/reflect/reflect";
import { toReflectParam } from "../../../effect/reflect/reflect";
import type { PlayerId } from "../../../player/player";
import type { GameState } from "../../../state/game-state";

/**
 * ダメージ反射フローを実行できるか否かを判定する
 * @param result 戦闘結果
 * @return 判定結果、trueでダメージ反射フローを行う
 */
export function canReflectFlow(result: BattleResult): boolean {
  return (
    result.name === "NormalHit" ||
    result.name === "Guard" ||
    result.name === "CriticalHit"
  );
}

/**
 * ダメージ反射フロー
 *
 * @param lastState 最新のゲームステート
 * @param attackerId 攻撃側のプレイヤーID
 * @return 更新結果
 */
export function reflectFlow(
  lastState: GameState,
  attackerId: PlayerId
): GameState[] {
  const defender = lastState.players.find((v) => v.playerId !== attackerId);

  if (!defender) {
    throw new Error("not found defender");
  }

  const reflectParams = defender.armdozer.effects
    .flatMap((v) => (v.type === "TryReflect" ? v : []))
    .map((v) => toReflectParam(v));
  return reflectParams.reduce(
    (stateHistory: GameState[], reflectParam: ReflectParam) => {
      const state = stateHistory[stateHistory.length - 1] ?? lastState;
      return [...stateHistory, reflect(state, attackerId, reflectParam)];
    },
    []
  );
}
