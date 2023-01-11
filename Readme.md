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

# テスト用スナップショット更新
npm run update-snapshot

# 型チェック
npm run type-check

# lint
npm run lint

# 静的コード解析
npm run code-analysis

# ライブラリ公開時の脆弱性チェック
npm audit --omit=dev

# package.json整形
# 本コマンド実行にはfixpackをインストールすること
# https://www.npmjs.com/package/fixpack
fixpack
```