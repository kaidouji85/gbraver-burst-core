// @flow

import type {InputCommand} from "./input-command/input-command";
import type {Battle} from "./battle/battle";
import type {TurnChange} from "./turn-change/turn-change";
import type {StartGame} from "./start-game/start-game";
import type {BurstEffect} from "./burst/burst-effect";
import type {EndGame} from "./end-game/end-game";
import type {EvenMatch} from "./even-match/even-match";

/** ゲーム中に発生する効果をまとめたもの */
export type Effect = StartGame | EndGame | EvenMatch | InputCommand | Battle | TurnChange | BurstEffect;
