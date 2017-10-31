# GブレイバーBURST ロジックコア

このパッケージは、GブレイバーBURSTの戦闘ロジックを集めたものです。
サーバサイド、ブラウザで同じロジックを使い回せるように、npmパッケージにしました。

## 使い方
### flowの場合

```javascript
import {createInitialState, ArmDozerIdList} from 'gbraver-burst-core';
import type {BattleStatus} from 'gbraver-burst-core/lib/flow-type';

const state: BattleStatus = createInitialState(
  {playerId: 'test01', armDozerId: ArmDozerIdList.SHIN_BRAVER},
  {playerId: 'test02', armDozerId: ArmDozerIdList.NEO_LANDOZER}
);
console.log(state);
```

### 通常jsの場合
```javascript
const {createInitialState, ArmDozerIdList} = require('gbraver-burst-core');

const state = createInitialState(
  {playerId: 'test01', armDozerId: ArmDozerIdList.SHIN_BRAVER},
  {playerId: 'test02', armDozerId: ArmDozerIdList.NEO_LANDOZER}
);
console.log(state);
```