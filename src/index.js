// @flow
export {ArmDozerIdList, ArmdozerAppearances, ArmDozers} from './master/armdozers';
export {GbraverBurstCore} from './game/index';

export type {Player, PlayerX, PlayerId} from './player/player';
export type {ArmDozerId, Armdozer, ArmdozerX} from './player/armdozer/armdozer';
export type {Burst, RecoverBattery, BuffPower, LightningBarrier} from './player/armdozer/burst';

export type {GameState, GameStateX} from './state/game-state';
export type {PlayerState, PlayerStateX} from './state/player-state';
export type {ArmdozerState, ArmdozerStateX} from './state/armdozer-state';
export type {ArmdozerEffect, EmptyArmdozerEffect, CorrectPower, TryReflect} from './state/armdozer-effect';

export type {Command, PlayerCommand, PlayerCommandX} from './command/command';
export type {BatteryCommand} from './command/battery';
export type {BurstCommand} from './command/burst';
export type {EmptyCommand} from './command/empty-command';

export type {Effect} from './effect/index';
export type {BatteryDeclaration} from './effect/battery-declaration/battery-declaration';
export type {Battle, BattleX} from './effect/battle/battle';
export type {BattleResult} from './effect/battle/result/battle-result';
export type {CriticalHit} from './effect/battle/result/critical-hit';
export type {Feint} from './effect/battle/result/feint';
export type {Guard} from './effect/battle/result/guard';
export type {Miss} from './effect/battle/result/miss';
export type {NormalHit} from './effect/battle/result/normal-hit';
export type {BurstEffect} from './effect/burst/burst-effect';
export type {GameEnd, GameEndX, GameEndResult} from './effect/game-end/game-end';
export type {InputCommand, Selectable, NoChoice} from './effect/input-command/input-command';
export type {Reflect, ReflectDamageEffect} from './effect/reflect/reflect';
export type {StartGame} from './effect/start-game/start-game';
export type {TurnChange} from './effect/turn-change/turn-change';
export type {UpdateRemainingTurn, EndArmdozerEffect} from './effect/update-remaning-turn/update-remaining-turn';
export type {RightItself} from './effect/right-itself/right-itself';

// TODO 以下は廃止予定
export {start} from './game/start/start';
export {progress} from './game/progress/index';
