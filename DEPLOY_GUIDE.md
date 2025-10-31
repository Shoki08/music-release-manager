# 📱 iPhoneでMusic Release Managerを使う方法

## ステップ1: GitHubリポジトリを作成

1. https://github.com にアクセスしてログイン
2. 右上の「+」→「New repository」をクリック
3. Repository name: `music-release-manager`
4. Public を選択
5. 「Create repository」をクリック

## ステップ2: ファイルをアップロード

### 方法A: GitHub Web UI（簡単）

1. リポジトリページで「uploading an existing file」をクリック
2. 以下のファイルをすべてドラッグ&ドロップ：
   - index.html
   - app.js
   - sw.js
   - manifest.json
   - icon.svg
   - icon-192.png
   - icon-512.png
   - README.md
   
3. 「Commit changes」をクリック

### 方法B: Git コマンド

```bash
# ローカルで実行
cd /path/to/files
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/music-release-manager.git
git push -u origin main
```

## ステップ3: GitHub Pagesを有効化

1. リポジトリの「Settings」タブをクリック
2. 左メニューから「Pages」を選択
3. Source: 「Deploy from a branch」を選択
4. Branch: 「main」を選択、フォルダは「/ (root)」
5. 「Save」をクリック

**2-3分待つと、以下のURLでアクセス可能になります：**
```
https://YOUR_USERNAME.github.io/music-release-manager/
```

## ステップ4: iPhoneにインストール

1. iPhoneのSafariでURLを開く
2. 画面下部の「共有」ボタン（□↑）をタップ
3. 下にスクロールして「ホーム画面に追加」をタップ
4. 「追加」をタップ

✅ これでアプリがホーム画面に追加されます！

## 方法2: ローカルネットワークで試す（開発用）

**PCとiPhoneが同じWi-Fiに接続されている場合：**

1. PCで以下を実行：
```bash
cd /path/to/files
python -m http.server 8000
```

2. PCのローカルIPアドレスを確認：
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` または `ip addr`

3. iPhoneのSafariで以下を開く：
```
http://[PCのIPアドレス]:8000
```
例: `http://192.168.1.100:8000`

⚠️ 注意: この方法では完全なPWA機能（オフライン対応など）は動作しません。
HTTPSが必要なため、GitHub Pagesの使用を推奨します。

## トラブルシューティング

### GitHub Pagesで404エラー
- 2-3分待ってから再度アクセス
- ファイル名が正しいか確認（特にindex.html）

### iPhoneで「ホーム画面に追加」が表示されない
- Safariで開いているか確認（ChromeやFirefoxではなく）
- HTTPSでアクセスしているか確認

### データが消えた
- 定期的に「💾 エクスポート」でバックアップ
- Safariの設定→Safari→詳細→Webサイトデータで確認

## 完了！🎉

これでiPhoneでMusic Release Managerが使えます！
音楽の公開管理を楽しんでください 🎵
