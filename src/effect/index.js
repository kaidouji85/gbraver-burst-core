// @flow

import type {InputCommand} from "./input-command/input-command";
import type {Battle} from "./battle/battle";
import type {TurnChange} from "./turn-change/turn-change";
import type {StartGame} from "./start-game/start-game";
import type {BurstEffect} from "./burst/burst-effect";

/** ゲーム中に発生する効果をまとめたもの */
export type Effect = StartGame | InputCommand | Battle | TurnChange | BurstEffect;
