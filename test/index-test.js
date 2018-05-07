// @flow
import test from 'ava';
import {start} from "../src/index";
import {ArmDozerIdList, ArmDozers} from "../src/master/armdozers";
import type {Player} from "../src/player/player";
import type {GameState} from "../src/game-state/game-state";
import {progress} from "../src/progress";

test('初期状態を正しく作ることができる', t => {
  const player1: Player = {
    playerId: 'player1',
    armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
  };
  const player2: Player = {
    playerId: 'player2',
    armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) || ArmDozers[0]
  };
  const result: GameState[] = start(player1, player2);
  t.is(result.length > 0, true);
  t.is(result[0].effect.name, 'InputCommand');
  t.pass();
});

test('startで作った初期状態からゲームを進めることができる', t => {
  const player1: Player = {
    playerId: 'player1',
    armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
  };
  const player2: Player = {
    playerId: 'player2',
    armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) || ArmDozers[0]
  };
  const initialState = start(player1, player2);

  const command1 = {
    playerId: 'player1',
    command: {
      type: 'BATTERY_COMMAND',
      battery: 0
    }
  };
  const command2 = {
    playerId: 'player2',
    command: {
      type: 'BATTERY_COMMAND',
      battery: 0
    }
  };
  const update = progress(initialState[0], [command1, command2]);
  t.is(update.length > 0, true);
  t.pass();
});