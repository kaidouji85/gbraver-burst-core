# GブレイバーBURST ロジックコア

GブレイバーBURSTの戦闘ロジックを集めたものです。
サーバサイド、ブラウザで同じロジックを使い回せるように、npmパッケージにしました。

## 使い方

```javascript
import {start, progress} from 'gbraver-burst-core';
import type {GameState} from 'gbraver-burst-core/lib/game-state/game-state';

function main() {
  const shinBraver = ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER);
  const neoLandozer = ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER);
  
  if (!shinBraver || !neoLandozer) {
    return;
  }
  
  const player1 = {
    playerId: 'player1',
    armdozer: shinBraver,
  };
  const player2 = {
    playerId: 'player2',
    armdozer: neoLandozer,
  };
  const state = start(player1, player2);
  console.log(state);  
}
```