// @flow

import test from 'ava';
import type {GameState, PlayerState} from "../../../src";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import {EMPTY_ARMDOZER_STATE} from "../../../src/empty/armdozer";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {reflectFlow} from "../../../src/game/progress/reflect-flow";

/** 攻撃側プレイヤー */
const ATTACKER: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'attacker',
    armdozer: {
        ...EMPTY_ARMDOZER_STATE,
        hp: 3000,
        maxHp: 3000,
    }
};

/** 防御側プレイヤー */
const DEFENDER: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'defender',
    armdozer: {
        ...EMPTY_ARMDOZER_STATE,
        hp: 3000,
        maxHp: 3000,
        effects: [
            {
                type: 'TryReflect',
                damage: 5000,
                effect: 'Lightning',
                remainingTurn: 2,
            }
        ]
    }
};

test('ダメージ反射が正しく適用される', t => {
    const lastState: GameState = {
        ...EMPTY_GAME_STATE,
        players: [ATTACKER, DEFENDER],
    };

    const result = reflectFlow(lastState, 'attacker');
    t.is(result.length, 1);
    t.is(result[0].effect.name, 'Reflect');
});

test('ダメージ反射の重ね掛けも正しく処理される', t => {
    const multiReflect: PlayerState = {
        ...DEFENDER,
        armdozer: {
            ...DEFENDER.armdozer,
            effects: [
                ...DEFENDER.armdozer.effects,
                {
                    type: 'TryReflect',
                    damage: 3000,
                    effect: 'Lightning',
                    remainingTurn: 2,
                },
                {
                    type: 'TryReflect',
                    damage: 2000,
                    effect: 'Lightning',
                    remainingTurn: 2,
                },
            ]
        }
    };
    const lastState: GameState = {
        ...EMPTY_GAME_STATE,
        players: [ATTACKER, multiReflect],
    };

    const result = reflectFlow(lastState, 'attacker');
    t.is(result.length, 3);
    t.is(result[0].effect.name, 'Reflect');
    t.is(result[1].effect.name, 'Reflect');
    t.is(result[2].effect.name, 'Reflect');
});