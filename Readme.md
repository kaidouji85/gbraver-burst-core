# GブレイバーBURST ロジックコア

このパッケージは、GブレイバーBURSTの戦闘ロジックを集めたものです。
サーバサイド、ブラウザで同じロジックを使い回せるように、npmパッケージにしました。

## 使い方

```javascript
import {start, ArmDozers, ArmDozerIdList} from 'gbraver-burst-core';
import type {BattleState} from 'gbraver-burst-core/lib/flow-type';

const player1 = {
  playerId: 'player1',
  armDozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
};
const player2 = {
  playerId: 'player2',
  armDozer: ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) || ArmDozers[0]
};
const state = start(player1, player2);
console.log(state);
```