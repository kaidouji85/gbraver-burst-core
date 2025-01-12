import { PlayerId } from "../../player/player";
import { GameState, GameStateX } from "../../state/game-state";
import { isPlayerDeath } from "../../state/player-state/is-player-death";
import { Battle } from "./battle";
import { updateDefender } from "./players/update-defender";
import { battleResult } from "./result/battle-result";

/** オプション */
type Options = {
  /** 更新前の状態 */
  lastState: GameState;
  /** 攻撃側プレイヤーID */
  attackerId: PlayerId;
  /** 攻撃側バッテリー */
  attackerBattery: number;
  /** 防御側プレイヤーID */
  defenderId: PlayerId;
  /** 防御側バッテリー */
  defenderBattery: number;
};

/**
 * 戦闘を行う
 * @param options オプション
 * @returns 戦闘後の更新ステート、戦闘できない場合はnullを返す
 */
export function battle(options: Options): GameStateX<Battle> {
  const {
    lastState,
    attackerId,
    attackerBattery,
    defenderId,
    defenderBattery,
  } = options;
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
