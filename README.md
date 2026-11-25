# 高井鴻山の目で 小布施 / Obuse through Kōzan’s eyes

小布施×高井鴻山のオリエンテーション用、没入型ウェブプレゼンテーション（日英）。
ビルドもライブラリもない静的 HTML なので、GitHub Pages にそのまま置けば公開できます。

## 公開（GitHub Pages）

1. GitHub で新しいリポジトリを作る（例：`kozan-obuse`）
2. このフォルダの中身をすべてリポジトリの直下に置いて push する
3. リポジトリの **Settings → Pages → Build and deployment** で
   Source を **Deploy from a branch**、Branch を **main / (root)** にして Save
4. 数分後、`https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます

`#5.1` のように URL の末尾で画面とビルドを指定できます（例：`…/#11.3` で「破産」）。

## 見る人の操作

| 操作 | 動き |
|---|---|
| → ・ Space ・ クリック ・ タップ | 次へ |
| ← ・ 画面左端のクリック | 前へ |
| スワイプ ・ スクロール | 進む／戻る |
| O ・「一覧」 | 全画面のサムネイルから選ぶ |
| Z ・「絵を拡大」 | 絵の細部をマウスで追って見る |
| L ・「English／日本語」 | 言語切替 |
| T ・ ボタン | 1万両の換算を切替（幅／幕末の米／江戸中〜後期の米／そば） |
| F | 全画面 |
| P | 発表者画面（台本・次の画面・20分タイマー。投影画面と同期） |
| B | 暗転 |
| ? | 操作の一覧 |

年表の点にカーソルを当てる（スマホはタップ）と、その年の出来事が出ます。
「この2日間」の画面では、点をクリックするとその場所の問いに飛びます。
「37と83」の画面では、年齢を入れると一行が出ます。

## ファイル

```
index.html        投影画面（本体）
presenter.html    発表者画面（P キーで開く）
css/deck.css      見た目と動き
js/deck.js        画面送り・ビルド・同期
js/ui.js          操作バー・一覧・スワイプ・視差・絵の拡大
js/notes.js       語り台本（日英）
img/              北斎の作品（パブリックドメイン）
img/permitted/    掲載許可が出た小布施の作品を置く場所（下記）
js/timeline.js    年表（鴻山／北斎の2段）と日本地図
js/japan.js       日本の海岸線（Natural Earth）
thumbs/           一覧用のサムネイル
fonts/            画面の文字だけを含むフォント（約200KB）
tools/subset-fonts.ps1  文言を変えたときにフォントを作り直す
contact-sheet.html      全画面の一覧（確認用）
```

## 文言を変えたら

フォントは画面で使う文字だけに絞っています。新しい漢字を足したら、次を実行してフォントを作り直してください（Windows・ネット接続が必要）。

```powershell
powershell -ExecutionPolicy Bypass -File tools\subset-fonts.ps1
```

## クレジット

- 書体：Shippori Mincho（FONTDASU）、Noto Sans JP（Google）— いずれも SIL Open Font License 1.1
- 葛飾北斎『神奈川沖浪裏』『凱風快晴』：Wikimedia Commons（パブリックドメイン）
- 日本の海岸線：Natural Earth 1:50m（パブリックドメイン）

## 小布施の作品画像を差し込む

小布施にある作品は、掲載許可が出るまで作品名と年だけを出しています。許可が出たら、次の名前で `img/permitted/` に置くと、その画面の背景に自動で出ます。

| ファイル名 | 出る画面 |
|---|---|
| kozan-portrait.jpg | 3 高井鴻山 |
| kanmachi-ceiling.jpg | 5 小布施にある北斎・14 私財で |
| gansho-in-phoenix.jpg | 5 小布施にある北斎 |
| fuji-koshi-ryu.jpg | 15 北斎、90歳 |
