// @flow

import test from 'ava';
import {createOpenPlayerState} from "../../src/game-state/open-player-state";
import {ArmDozerIdList, ArmDozers} from "../../src/master/armdozers";
import type {Player} from "../../src/player/player";
import type {OpenPlayerState} from "../../src/game-state/open-player-state";

test('公開可能プレイヤー情報を正しく生成できる', t => {
  const player: Player = {
    playerId: 'player1',
    armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
  };
  const result: OpenPlayerState = createOpenPlayerState(player);
  t.is(result.playerId, player.playerId);
});