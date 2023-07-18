import { BatteryBoostSkill } from "../../player/pilot";
import { PlayerId } from "../../player/player";
import { ArmdozerState } from "../../state/armdozer-state";
import { GameState, GameStateX } from "../../state/game-state";
import { PlayerState } from "../../state/player-state";
import { PilotSkillEffectX } from "./pilot-skill-effect";

/**
 * 回復後のバッテリーを計算する
 * @param armdozer アームドーザステート
 * @param skill スキル内容
 * @return 回復後のバッテリー
 */
export function calcBoostedBattery(
  armdozer: Readonly<ArmdozerState>,
  skill: Readonly<BatteryBoostSkill>,
): number {
  return Math.min(armdozer.battery + skill.recoverBattery, armdozer.maxBattery);
}

/**
 * パイロットスキル バッテリーブースト
 * @param lastState 最新のステート
 * @param invokerId スキル発動者のID
 * @param skill スキル内容
 * @return 更新結果、実行不可能な場合は例外を投げる
 */
export function batteryBoost(
  lastState: Readonly<GameState>,
  invokerId: Readonly<PlayerId>,
  skill: Readonly<BatteryBoostSkill>,
): GameStateX<PilotSkillEffectX<BatteryBoostSkill>> {
  const invoker = lastState.players.find((v) => v.playerId === invokerId);
  if (!invoker) {
    throw new Error("not found pilot skill invoker");
  }

  const updatedInvoker: PlayerState = {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      battery: calcBoostedBattery(invoker.armdozer, skill),
      effects: [
        ...invoker.armdozer.effects,
        {
          type: "BatteryRecoverSkip",
          period: {
            type: "Permanent"
          }
        }
      ],
    },
  };
  const updatedPlayers: PlayerState[] = lastState.players.map((v) =>
    v.playerId === invokerId ? updatedInvoker : v,
  );
  const effect: PilotSkillEffectX<BatteryBoostSkill> = {
    name: "PilotSkillEffect",
    invokerId: invokerId,
    skill,
  };
  return { ...lastState, players: updatedPlayers, effect: effect };
}