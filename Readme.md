# GブレイバーBURST ロジックコア

GブレイバーBURSTの戦闘ロジックを集めたものです。
サーバサイド、ブラウザで同じロジックを使い回せるように、npmパッケージにしました。

## 使い方

```javascript
import {GbraverBurstCore} from 'gbraver-burst-core';
import {ArmDozers, ArmDozerIdList} from 'gbraber-burst-core';

function main() {
  const game = new GbraverBurstCore();
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
  const state = game.start(player1, player2);
  console.log(state);
}
```