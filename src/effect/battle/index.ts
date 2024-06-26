import { PlayerId } from "../../player/player";
import { GameState, GameStateX } from "../../state/game-state";
import { isPlayerDeath } from "../../state/player-state/is-player-death";
import { Battle } from "./battle";
import { updateDefender } from "./players/update-defender";
import { battleResult } from "./result/battle-result";

/**
 * 戦闘を行う
 * @param lastState 更新前の状態
 * @param attackerId 攻撃側プレイヤーID
 * @param attackerBattery 攻撃側バッテリー
 * @param defenderId 防御側プレイヤーID
 * @param defenderBattery 防御側バッテリー
 * @returns 戦闘後の更新ステート、戦闘できない場合はnullを返す
 */
export function battle(
  lastState: GameState,
  attackerId: PlayerId,
  attackerBattery: number,
  defenderId: PlayerId,
  defenderBattery: number,
): GameStateX<Battle> {
  const attacker = lastState.players.find((p) => p.playerId === attackerId);
  const defender = lastState.players.find((p) => p.playerId === defenderId);
  if (!attacker || !defender) {
    throw new Error("not found attacker or defender");
  }

  const result = battleResult(
    attacker,
    attackerBattery,
    defender,
    defenderBattery,
  );
  const updatedDefender = updateDefender(result, defender);
  const updatedPlayers = lastState.players.map((p) =>
    p.playerId === updatedDefender.playerId ? updatedDefender : p,
  );
  const effect: Battle = {
    name: "Battle",
    attacker: attacker.playerId,
    isDeath: isPlayerDeath(updatedDefender),
    result: result,
  };
  return { ...lastState, players: updatedPlayers, effect };
}
