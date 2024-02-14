import { Burst } from "../../player/burst";
import { BuffPower } from "../../player/burst/buff-power";
import { RecoverBattery } from "../../player/burst/recover-battery";
import { PlayerId } from "../../player/player";
import { GameState, GameStateX } from "../../state/game-state";
import { buffPower } from "./buff-power";
import { BurstEffect } from "./burst-effect";
import { BurstInvoke, BurstInvokeResult } from "./burst-invoke";
import { recoverBattery } from "./recover-battery";

/**
 * バースト種別に応じた効果を適用する
 * @param params バースト発動情報
 * @return バースト発動結果
 */
function invokeBurst(params: BurstInvoke<Burst>): BurstInvokeResult {
  if (params.burst.type === "RecoverBattery") {
    const burst: RecoverBattery = params.burst;
    return recoverBattery({ ...params, burst });
  }

  if (params.burst.type === "BuffPower") {
    const burst: BuffPower = params.burst;
    return buffPower({ ...params, burst });
  }

  throw new Error("burst not found");
}

/**
 * バーストを実行する
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return バースト結果、実行不可能な場合はnullを返す
 */
export function burst(
  lastState: GameState,
  burstPlayerId: PlayerId,
): GameStateX<BurstEffect> {
  const invoker = lastState.players.find((v) => v.playerId === burstPlayerId);
  const other = lastState.players.find((v) => v.playerId !== burstPlayerId);
  if (!invoker || !other) {
    throw new Error("invalid burst player id");
  }

  const burst = invoker.armdozer.burst;
  const result = invokeBurst({ burst, invoker, other });
  const updatedInvoker = {
    ...result.invoker,
    armdozer: {
      ...result.invoker.armdozer,
      enableBurst: false,
    },
  };
  const updatedOther = result.other;
  const players = lastState.players.map((v) =>
    v.playerId === burstPlayerId ? updatedInvoker : updatedOther,
  );
  return {
    ...lastState,
    players,
    effect: {
      name: "BurstEffect",
      burstPlayer: burstPlayerId,
      burst,
    },
  };
}
