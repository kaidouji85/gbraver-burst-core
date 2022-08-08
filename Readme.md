# GブレイバーBURST ロジックコア

GブレイバーBURSTの戦闘ロジックを集めたものです。
サーバサイド、ブラウザで同じロジックを使い回せるように、npmパッケージにしました。

## 各種コマンド

### セットアップ
```shell
npm ci
```

### 各種コマンド
```shell
# ビルド
npm run build

# テスト
npm test

# 型チェック
npm run type-check

# lint
npm run lint
```

### スナップショット更新
```shell
export SHOULD_UPDATE_SNAPSHOT=true
npm run test

# スナップショット更新後はSHOULD_UPDATE_SNAPSHOTにfalseをセットする
export SHOULD_UPDATE_SNAPSHOT=false
# or
unset SHOULD_UPDATE_SNAPSHOT
```