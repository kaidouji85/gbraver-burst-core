import { BattleResult } from "../../../effect/battle/result/battle-result";
import { reflect } from "../../../effect/reflect";
import { ReflectParam } from "../../../effect/reflect/reflect";
import { toReflectParam } from "../../../effect/reflect/to-reflect-param";
import { PlayerId } from "../../../player/player";
import { GameState } from "../../../state/game-state";

/**
 * ダメージ反射フローを実行できるか否かを判定する
 * @param result 戦闘結果
 * @returns 判定結果、trueでダメージ反射フローを行う
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
    .flatMap((v) => (v.type === "TryReflect" ? v : []))
    .map((v) => toReflectParam(v));
  return reflectParams.reduce(
    (stateHistory: GameState[], reflectParam: ReflectParam) => {
      const state = stateHistory[stateHistory.length - 1] ?? lastState;
      return [...stateHistory, reflect(state, attackerId, reflectParam)];
    },
    [],
  );
}
