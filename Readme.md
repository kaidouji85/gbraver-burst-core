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
npx jest -u

# 型チェック
npm run type-check

# lint
npm run lint

# ライブラリ公開時の脆弱性チェック
npm audit --omit=dev

# package.json整形
# 本コマンド実行にはfixpackをインストールすること
# https://www.npmjs.com/package/fixpack
fixpack
```

## GitHub Actions設定

### Secrets設定

[ここ](https://docs.github.com/ja/actions/security-guides/using-secrets-in-github-actions)を参考にGitHub ActionsのSecretsを設定する。
以下が設定内容である。

**secrets**
| シークレット名 | 値 |
|-------|----|
| NPM_TOKEN | npmの[Personal Access Token](https://docs.npmjs.com/creating-and-viewing-access-tokens) |
| SONAR_TOKEN | Sonar Qube CloudのToken |

## License

MIT
