# 🚀 クイックスタートガイド

## ステップ1: ファイルの準備

以下のファイルをダウンロードしてください：

- `index.html` - メインHTMLファイル
- `app.js` - アプリケーションロジック
- `sw.js` - Service Worker（オフライン対応）
- `manifest.json` - PWA設定
- `icon.svg` - アイコンSVG
- `generate-icons.html` - アイコン生成ツール
- `.gitignore` - Git設定
- `README.md` - ドキュメント

## ステップ2: アイコン画像の生成

1. ブラウザで `generate-icons.html` を開く
2. 「ダウンロード」ボタンをクリックして以下を保存：
   - `icon-192.png`
   - `icon-512.png`

## ステップ3: GitHubリポジトリの作成

```bash
# 新しいディレクトリを作成
mkdir music-release-manager
cd music-release-manager

# すべてのファイルをコピー
# （ダウンロードしたファイルをこのディレクトリに配置）

# Gitリポジトリを初期化
git init
git add .
git commit -m "Initial commit: Music Release Manager PWA"

# GitHubにプッシュ
git remote add origin https://github.com/あなたのユーザー名/music-release-manager.git
git branch -M main
git push -u origin main
```

## ステップ4: GitHub Pagesを有効化

1. GitHubでリポジトリを開く
2. **Settings** タブをクリック
3. 左メニューから **Pages** を選択
4. **Source** で `main` ブランチを選択
5. フォルダは **/ (root)** を選択
6. **Save** をクリック

数分後、以下のURLでアクセス可能になります：
```
https://あなたのユーザー名.github.io/music-release-manager/
```

## ステップ5: PWAとしてインストール

### デスクトップ（Chrome/Edge）
1. アプリのURLを開く
2. アドレスバー右側の「インストール」アイコンをクリック
3. 「インストール」を確認

### iOS（Safari）
1. アプリのURLを開く
2. 共有ボタン（□↑）をタップ
3. 「ホーム画面に追加」を選択

### Android（Chrome）
1. アプリのURLを開く
2. メニュー（⋮）をタップ
3. 「ホーム画面に追加」を選択

## 基本的な使い方

### 1. プロジェクト作成
```
「＋ 新規プロジェクト」→ 曲の情報を入力
```

### 2. 公開管理
```
「📤 公開管理」タブ → プラットフォームにチェック
```

### 3. テンプレート活用
```
「📋 テンプレート」タブ → 「📋 コピー」→ 各プラットフォームに貼り付け
```

### 4. データバックアップ
```
左サイドバー → 「💾 エクスポート」
```

## トラブルシューティング

### PWAがインストールできない
- HTTPSが有効か確認（GitHub Pagesは自動的にHTTPS）
- manifest.jsonとService Workerが正しく読み込まれているか確認

### データが消えた
- ブラウザのキャッシュをクリアするとデータが消える
- 定期的にエクスポートしてバックアップを取る

### アイコンが表示されない
- icon-192.png と icon-512.png が正しく配置されているか確認
- キャッシュをクリアしてリロード

## カスタマイズ

### 色の変更
`index.html` の `<script src="https://cdn.tailwindcss.com"></script>` の後に追加：
```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#your-color'
        }
      }
    }
  }
</script>
```

### プラットフォームの追加
`app.js` の `PLATFORMS` 配列に追加：
```javascript
{ id: 'new_platform', name: '新プラットフォーム', icon: '🎵', category: 'audio' }
```

## 次のステップ

- カスタムドメインの設定
- Google Analyticsの追加（プライバシーに配慮）
- プラットフォームAPIとの連携（将来的に）

## サポート

問題が発生した場合は、GitHubのIssueで報告してください。

---

**楽しい音楽制作と公開を！🎵**
