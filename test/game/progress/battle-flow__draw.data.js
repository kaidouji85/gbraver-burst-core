// @flow

import type { BatteryCommand } from "../../../src/command/battery";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import type { PlayerCommandX } from "../../../src/game/command/player-command";
import type { GameState } from "../../../src/state/game-state";
import type { PlayerState } from "../../../src/state/player-state";

export const attacker: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    hp: 3000,
    maxHp: 3000,
    power: 2000,
    battery: 4,
    maxBattery: 5,
  },
};

export const defender: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    hp: 3000,
    maxHp: 3000,
    power: 2000,
    battery: 5,
    maxBattery: 5,
    effects: [
      {
        type: "TryReflect",
        damage: 5000,
        effect: "Lightning",
        period: {
          type: "TurnLimit",
          remainingTurn: 1,
        },
      },
    ],
  },
};

export const lastState: GameState = {
  ...EMPTY_GAME_STATE,
  activePlayerId: "attacker",
  players: [attacker, defender],
};

export const commands: [
  PlayerCommandX<BatteryCommand>,
  PlayerCommandX<BatteryCommand>
] = [
  {
    playerId: "attacker",
    command: { type: "BATTERY_COMMAND", battery: 2 },
  },
  {
    playerId: "defender",
    command: { type: "BATTERY_COMMAND", battery: 0 },
  },
];
