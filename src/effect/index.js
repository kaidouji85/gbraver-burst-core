// @flow

import type {InputCommand} from "./input-command/input-command";
import type {Battle} from "./battle/battle";

/** ゲーム中に発生する効果をまとめたもの */
export type Effect = InputCommand | Battle;