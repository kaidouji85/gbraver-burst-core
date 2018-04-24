# GブレイバーBURST ロジックコア

このパッケージは、GブレイバーBURSTの戦闘ロジックを集めたものです。
サーバサイド、ブラウザで同じロジックを使い回せるように、npmパッケージにしました。

## 使い方

```javascript
import {start, progress} from 'gbraver-burst-core';
import type {GameState} from 'gbraver-burst-core/lib/game-state/game-state';

const player1 = {
  playerId: 'player1',
  armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
};
const player2 = {
  playerId: 'player2',
  armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) || ArmDozers[0]
};
const state = start(player1, player2);
console.log(state);
```