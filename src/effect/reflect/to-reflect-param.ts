import { TryReflect } from "../../state/armdozer-effect/try-reflect";
import { ReflectParam } from "./reflect";

/**
 * ダメージ反射ステートをダメージ反射パラメータに変換する
 * @param burst 変換元
 * @return 変換結果
 */
export function toReflectParam(burst: TryReflect): ReflectParam {
  return {
    damage: burst.damage,
    effect: "Lightning",
  };
}
