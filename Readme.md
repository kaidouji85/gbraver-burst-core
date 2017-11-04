# GブレイバーBURST ロジックコア

このパッケージは、GブレイバーBURSTの戦闘ロジックを集めたものです。
サーバサイド、ブラウザで同じロジックを使い回せるように、npmパッケージにしました。

## 使い方
### flowが使える

```javascript
import {createInitialState, ArmDozerIdList} from 'gbraver-burst-core';
import type {BattleState} from 'gbraver-burst-core/lib/flow-type';

const state: BattleState = createInitialState(
  {playerId: 'test01', armDozerId: ArmDozerIdList.SHIN_BRAVER},
  {playerId: 'test02', armDozerId: ArmDozerIdList.NEO_LANDOZER}
);
console.log(state);
```

### 通常jsの場合
```javascript
import {createInitialState, ArmDozerIdList} from 'gbraver-burst-core';

const state = createInitialState(
  {playerId: 'test01', armDozerId: ArmDozerIdList.SHIN_BRAVER},
  {playerId: 'test02', armDozerId: ArmDozerIdList.NEO_LANDOZER}
);
console.log(state);
```