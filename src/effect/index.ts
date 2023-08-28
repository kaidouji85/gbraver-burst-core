import { z } from "zod";

import { BatteryDeclaration, BatteryDeclarationSchema } from "./battery-declaration/battery-declaration";
import { Battle, BattleSchema } from "./battle/battle";
import { BurstEffect, BurstEffectSchema } from "./burst/burst-effect";
import { GameEnd, GameEndSchema } from "./game-end/game-end";
import { InputCommand, InputCommandSchema } from "./input-command/input-command";
import { PilotSkillEffect, PilotSkillEffectSchema } from "./pilot-skill/pilot-skill-effect";
import { Reflect, ReflectSchema } from "./reflect/reflect";
import { RightItself, RightItselfSchema } from "./right-itself/right-itself";
import { StartGame, StartGameSchema } from "./start-game/start-game";
import { TurnChange, TurnChangeSchema } from "./turn-change/turn-change";
import { UpdateRemainingTurn, UpdateRemainingTurnSchema } from "./update-remaning-turn/update-remaining-turn";

/** ゲーム中に発生する効果をまとめたもの */
export type Effect =
  | StartGame
  | GameEnd
  | InputCommand
  | Reflect
  | BatteryDeclaration
  | Battle
  | TurnChange
  | BurstEffect
  | UpdateRemainingTurn
  | RightItself
  | PilotSkillEffect;

/** Effect zodスキーマ */
export const EffectSchema = z.union([
  StartGameSchema,
  GameEndSchema,
  InputCommandSchema,
  ReflectSchema,
  BatteryDeclarationSchema,
  BattleSchema,
  TurnChangeSchema,
  BurstEffectSchema,
  UpdateRemainingTurnSchema,
  RightItselfSchema,
  PilotSkillEffectSchema,
]);