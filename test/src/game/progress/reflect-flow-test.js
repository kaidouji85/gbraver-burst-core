// @flow

import test from 'ava';
import type {Battle, PlayerState} from "../../../../src";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import {reflectFlow} from "../../../../src/game/progress/battle-flow";
import type {GameStateX} from "../../../../src/state/game-state";

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
                effect: 'Lightning'
            }
        ]
    }
};

test('ダメージ反射が正しく適用される', t => {
    const lastState: GameStateX<Battle> = {
        ...EMPTY_GAME_STATE,
        activePlayerId: 'attacker',
        players: [ATTACKER, DEFENDER],
        effect: {
            name: 'Battle',
            attacker: ATTACKER.playerId,
            isDeath: false,
            result: {
                name: 'NormalHit',
                damage: 1000
            }
        }
    };

    const result = reflectFlow(lastState);
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
                    effect: 'Lightning'
                },
                {
                    type: 'TryReflect',
                    damage: 2000,
                    effect: 'Lightning'
                },
            ]
        }
    };
    const lastState: GameStateX<Battle> = {
        ...EMPTY_GAME_STATE,
        activePlayerId: 'attacker',
        players: [ATTACKER, multiReflect],
        effect: {
            name: 'Battle',
            attacker: ATTACKER.playerId,
            isDeath: false,
            result: {
                name: 'NormalHit',
                damage: 1000
            }
        }
    };

    const result = reflectFlow(lastState);
    t.is(result.length, 3);
    t.is(result[0].effect.name, 'Reflect');
    t.is(result[1].effect.name, 'Reflect');
    t.is(result[2].effect.name, 'Reflect');
});

test('攻撃がヒットしていない場合は何もしない', t => {
    const lastState: GameStateX<Battle> = {
        ...EMPTY_GAME_STATE,
        activePlayerId: 'attacker',
        players: [ATTACKER, DEFENDER],
        effect: {
            name: 'Battle',
            attacker: ATTACKER.playerId,
            isDeath: false,
            result: {
                name: 'Miss',
            }
        }
    };

    const result = reflectFlow(lastState);
    t.is(result.length, 0);
});