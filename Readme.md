# GブレイバーBURST ロジックコア

このパッケージは、GブレイバーBURSTの戦闘ロジックを集めたものです。
サーバサイド、ブラウザで同じロジックを使い回せるように、npmパッケージにしました。

## 使い方

```javascript
import {start, ArmDozers, ArmDozerIdList} from 'gbraver-burst-core';
import type {BattleState} from 'gbraver-burst-core/lib/flow-type';

const state: BattleState = start(
  {
    playerId: 'test01',
    armDozerId: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
  }, {
    playerId: 'test02',
    armDozerId: ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) || ArmDozers[0]
  }
);
console.log(state);
```