# 🎵 Music Release Manager

音楽・動画コンテンツの複数プラットフォームへの公開を効率化するPWA（Progressive Web App）です。

## 📋 機能

- **プロジェクト管理**: 曲ごとにプロジェクトを作成・管理
- **メタデータ管理**: タイトル、説明、タグ、ハッシュタグを一元管理
- **公開状況トラッキング**: 各プラットフォームへの投稿状況をチェックリストで管理
- **テンプレート生成**: プラットフォーム別の投稿テンプレートを自動生成
- **進捗可視化**: プロジェクト全体の進捗をパーセンテージで表示
- **データ管理**: エクスポート/インポート機能でバックアップ可能
- **オフライン対応**: インターネット接続なしでも動作
- **レスポンシブデザイン**: PC・タブレット・スマホ対応

## 🚀 対応プラットフォーム

### 動画プラットフォーム
- YouTube
- TikTok
- Instagram

### 音楽プラットフォーム
- Soundon
- Spotify
- SoundCloud
- TikTok音源

## 📦 GitHub Pagesへのデプロイ

### 1. リポジトリの準備

```bash
# リポジトリをクローンまたは新規作成
git clone https://github.com/your-username/music-release-manager.git
cd music-release-manager

# ファイルをコピー
# index.html, app.js, sw.js, manifest.json, icon.svg をコピー
```

### 2. アイコン画像の生成

`icon.svg`からPNG画像を生成します（オンラインツールまたはImageMagickを使用）：

```bash
# ImageMagickを使用する場合
convert icon.svg -resize 192x192 icon-192.png
convert icon.svg -resize 512x512 icon-512.png
```

または、以下のオンラインツールを使用：
- [CloudConvert](https://cloudconvert.com/svg-to-png)
- [Convertio](https://convertio.co/ja/svg-png/)

### 3. GitHub Pagesの有効化

1. GitHubリポジトリにプッシュ：
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. リポジトリの Settings → Pages へ移動
3. Source を `main` ブランチの `/ (root)` に設定
4. Save をクリック

数分後、`https://your-username.github.io/music-release-manager/` でアクセス可能になります。

### 4. カスタムドメイン（オプション）

独自ドメインを使用する場合：
1. リポジトリのルートに `CNAME` ファイルを作成
2. ファイルにドメイン名を記載（例: `music.example.com`）
3. DNSレコードでCNAMEを設定

## 💻 ローカルでの開発

```bash
# シンプルなHTTPサーバーを起動
python -m http.server 8000
# または
npx serve .

# ブラウザで http://localhost:8000 を開く
```

## 📱 PWAとしてインストール

### デスクトップ（Chrome/Edge）
1. アプリを開く
2. アドレスバーの右側にある「インストール」アイコンをクリック
3. 「インストール」を確認

### モバイル（iOS Safari）
1. アプリを開く
2. 共有ボタンをタップ
3. 「ホーム画面に追加」を選択

### モバイル（Android Chrome）
1. アプリを開く
2. メニュー（⋮）をタップ
3. 「ホーム画面に追加」を選択

## 🔧 使い方

### プロジェクトの作成
1. 「＋ 新規プロジェクト」ボタンをクリック
2. 曲のタイトル、説明、タグなどを入力
3. 自動保存されます

### 公開管理
1. 「📤 公開管理」タブを開く
2. 各プラットフォームに投稿したらチェックボックスをクリック
3. 公開URLを入力（後で確認用）
4. 進捗がリアルタイムで更新されます

### テンプレート使用
1. 「📋 テンプレート」タブを開く
2. プラットフォーム別のテンプレートが自動生成されます
3. 「📋 コピー」ボタンで簡単にコピー
4. 各プラットフォームに貼り付けて使用

### データのバックアップ
- 「💾 エクスポート」でJSONファイルをダウンロード
- 「📥 インポート」でバックアップから復元

## 🛠️ 技術スタック

- **React 18**: UIフレームワーク
- **Tailwind CSS**: スタイリング
- **LocalStorage**: データ永続化
- **Service Worker**: オフライン対応・キャッシング
- **PWA**: プログレッシブウェブアプリ

## 📝 データの保存

すべてのデータはブラウザのLocalStorageに保存されます。
- データはデバイスのローカルに保存
- サーバーへの送信なし
- ブラウザのキャッシュをクリアするとデータが消えるため、定期的にエクスポート推奨

## 🔒 プライバシー

- データはすべてローカルに保存
- 外部サーバーへの送信なし
- トラッキングなし
- Cookie不使用

## 📄 ライセンス

MIT License

## 🤝 貢献

Issue、Pull Requestを歓迎します！

## 📧 サポート

問題が発生した場合は、GitHubのIssueを作成してください。

---

**Note**: このアプリは公開作業の管理を支援するツールです。実際の投稿は各プラットフォームで手動で行う必要があります。
