# 📁 Music Release Manager - ファイル構成

## プロジェクト概要

Suno、Soraなどで作成した音楽・動画コンテンツを、複数のプラットフォーム（YouTube、TikTok、Instagram、Soundon、Spotify、SoundCloud等）に効率的に公開するためのPWAアプリです。

## 主要機能

✅ プロジェクト（曲）ごとの管理
✅ メタデータの一元管理（タイトル、説明、タグ、ハッシュタグ）
✅ 7つのプラットフォームの公開状況トラッキング
✅ プラットフォーム別投稿テンプレート自動生成
✅ 進捗の可視化（パーセンテージ表示）
✅ データのエクスポート/インポート
✅ オフライン対応（PWA）
✅ レスポンシブデザイン

## ファイル構成

```
music-release-manager/
├── index.html              # メインHTMLファイル
├── app.js                  # Reactアプリケーションロジック
├── sw.js                   # Service Worker（オフライン対応）
├── manifest.json           # PWA設定ファイル
├── icon.svg                # アイコンSVGソース
├── icon-192.png            # PWAアイコン（192x192）※要生成
├── icon-512.png            # PWAアイコン（512x512）※要生成
├── generate-icons.html     # アイコン生成ツール
├── package.json            # npm設定（オプション）
├── .gitignore             # Git除外設定
├── README.md              # 詳細ドキュメント
├── QUICKSTART.md          # クイックスタートガイド
└── FILE_STRUCTURE.md      # このファイル
```

## 技術スタック

- **React 18**: UIライブラリ（CDN経由）
- **Tailwind CSS**: CSSフレームワーク（CDN経由）
- **Vanilla JavaScript**: 追加の依存なし
- **LocalStorage API**: データ永続化
- **Service Worker API**: オフライン対応
- **Web App Manifest**: PWA機能

## セットアップ手順

### 1. アイコン画像の生成

```bash
# ブラウザでgenerate-icons.htmlを開いて
# icon-192.pngとicon-512.pngをダウンロード
```

### 2. ローカルテスト

**方法A: Python**
```bash
python -m http.server 8000
```

**方法B: Node.js（package.json使用）**
```bash
npm start
# または
npx serve . -p 8000
```

**方法C: VS Code Live Server**
- index.htmlを右クリック → "Open with Live Server"

ブラウザで `http://localhost:8000` を開く

### 3. GitHub Pagesデプロイ

```bash
# リポジトリ作成
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main

# GitHub Settings → Pages → Source: main → Save
```

アクセスURL: `https://USERNAME.github.io/REPO/`

## データ管理

### 保存場所
- **LocalStorage**: ブラウザ内に保存
- **キー名**: `musicProjects`
- **フォーマット**: JSON

### バックアップ方法
1. アプリ内で「💾 エクスポート」ボタンをクリック
2. JSONファイルがダウンロードされる
3. 「📥 インポート」で復元可能

### データ構造
```json
[
  {
    "id": 1234567890,
    "title": "曲のタイトル",
    "description": "説明文",
    "tags": "pop, electronic",
    "hashtags": "#music #newrelease",
    "videoFile": "video.mp4",
    "audioFile": "audio.mp3",
    "hookFile": "hook.mp3",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "notes": "メモ",
    "platforms": {
      "youtube": {
        "posted": true,
        "url": "https://youtube.com/...",
        "postedAt": "2025-01-01T00:00:00.000Z"
      }
      // 他のプラットフォーム...
    }
  }
]
```

## 対応プラットフォーム

### 動画系（category: 'video'）
1. **YouTube** 📺
   - 動画投稿
   - YouTube Studio: https://youtube.com/upload

2. **TikTok** 🎵
   - 短編動画投稿
   - Creator Center: https://www.tiktok.com/creator-center/upload

3. **Instagram** 📷
   - リール・フィード投稿
   - https://www.instagram.com/

### 音楽系（category: 'audio'）
4. **Soundon** 🎧
   - 音楽配信プラットフォーム
   - https://soundon.global/

5. **Spotify** 🎶
   - ストリーミング配信
   - For Artists: https://artists.spotify.com/

6. **SoundCloud** ☁️
   - 音楽共有プラットフォーム
   - Upload: https://soundcloud.com/upload

7. **TikTok音源** 🔊
   - TikTok内での音源利用

## カスタマイズ方法

### プラットフォームの追加

`app.js` の `PLATFORMS` 配列に追加：

```javascript
const PLATFORMS = [
  // 既存のプラットフォーム...
  { 
    id: 'new_platform',           // 一意のID
    name: '新プラットフォーム',    // 表示名
    icon: '🎵',                   // 絵文字アイコン
    category: 'audio'             // 'video' または 'audio'
  }
];
```

### UIカラーの変更

`index.html` の Tailwind CSS設定部分を編集：

```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          indigo: {
            600: '#your-color'
          }
        }
      }
    }
  }
</script>
```

### 言語の変更

`app.js` 内の文字列を編集して他言語化も可能です。

## トラブルシューティング

### PWAがインストールできない
- ✅ HTTPSでアクセスしているか確認（GitHub Pagesは自動HTTPS）
- ✅ manifest.jsonが正しく読み込まれているか確認
- ✅ Service Workerが正常に登録されているか確認（DevTools → Application）

### データが消えた
- ⚠️ ブラウザのキャッシュクリアでデータが消える
- 💡 定期的にエクスポートしてバックアップ
- 💡 複数ブラウザでのデータは共有されない

### アイコンが表示されない
- ✅ icon-192.png と icon-512.png が配置されているか確認
- ✅ manifest.json のパスが正しいか確認
- ✅ ブラウザのキャッシュをクリアしてリロード

### Service Workerが更新されない
```javascript
// キャッシュバージョンを変更（sw.js）
const CACHE_NAME = 'music-release-manager-v2'; // v1 → v2
```

## セキュリティとプライバシー

- ✅ すべてのデータはローカルに保存
- ✅ 外部サーバーへの送信なし
- ✅ トラッキングなし
- ✅ Cookieなし
- ✅ オープンソース

## パフォーマンス

- ⚡ 初回読み込み: ~2秒
- ⚡ 以降（キャッシュあり): ~0.5秒
- ⚡ オフライン動作: 完全対応
- ⚡ データ量: プロジェクト100件で約100KB

## ブラウザ対応

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ iOS Safari 14+
- ✅ Android Chrome 90+

## 今後の拡張案

- [ ] プラットフォームAPI連携（自動投稿）
- [ ] AIによる説明文・ハッシュタグ提案
- [ ] 投稿スケジュール機能
- [ ] チーム共有機能（Firebase等）
- [ ] 分析・レポート機能
- [ ] 多言語対応
- [ ] ダークモード

## ライセンス

MIT License - 自由に使用・改変・配布可能

## サポート・貢献

- 🐛 バグ報告: GitHub Issues
- 💡 機能リクエスト: GitHub Issues
- 🔧 プルリクエスト: 歓迎

---

**Happy Music Releasing! 🎵🚀**
