import type { BatteryCommand } from "../../../../src/command/battery";
import { EMPTY_ARMDOZER_STATE } from "../../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../../src/empty/player";
import type { PlayerCommandX } from "../../../../src/game/command/player-command";
import type { GameState } from "../../../../src/state/game-state";
import type { PlayerState } from "../../../../src/state/player-state";

/** 攻撃側プレイヤー */
export const attacker: PlayerState = { ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
  armdozer: { ...EMPTY_ARMDOZER_STATE,
    hp: 3000,
    maxHp: 3000,
    power: 2000,
    battery: 4,
    maxBattery: 5
  }
};

/** 防御側プレイヤー */
export const defender: PlayerState = { ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: { ...EMPTY_ARMDOZER_STATE,
    hp: 100,
    maxHp: 3000,
    power: 2000,
    battery: 5,
    maxBattery: 5
  }
};

/** 最新のゲームステート */
export const lastState: GameState = { ...EMPTY_GAME_STATE,
  activePlayerId: "attacker",
  players: [attacker, defender]
};

/** プレイヤーのコマンド */
export const commands: [PlayerCommandX<BatteryCommand>, PlayerCommandX<BatteryCommand>] = [{
  playerId: "attacker",
  command: {
    type: "BATTERY_COMMAND",
    battery: 2
  }
}, {
  playerId: "defender",
  command: {
    type: "BATTERY_COMMAND",
    battery: 1
  }
}];