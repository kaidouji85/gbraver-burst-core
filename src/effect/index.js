// @flow

import type {InputCommand} from "./input-command/input-command";
import type {Battle} from "./battle/battle";
import type {TurnChange} from "./turn-change/turn-change";
import type {StartGame} from "./start-game/start-game";
import type {BurstEffect} from "./burst/burst-effect";
import type {GameEnd} from "./game-end/game-end";
import type {BatteryDeclaration} from "./battery-declaration/battery-declaration";
import type {Reflect} from "./reflect/reflect";
import type {UpdateRemainingTurn} from "./update-remaning-turn/update-remaining-turn";

/** ゲーム中に発生する効果をまとめたもの */
export type Effect =
  StartGame |
  GameEnd |
  InputCommand |
  Reflect |
  BatteryDeclaration |
  Battle |
  TurnChange |
  BurstEffect |
  UpdateRemainingTurn;
