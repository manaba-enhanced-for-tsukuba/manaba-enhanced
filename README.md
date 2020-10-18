# manaba Enhanced for Tsukuba

Make your manaba a little bit more comfortable.

Get it via [Chrome Web Store](https://chrome.google.com/webstore/detail/manaba-enhanced-for-tsuku/fldngcbchlbfgbccilklplmhljilhfch).

**For students of University of Tsukuba.**

![Screenshot](./bin/dist/thumbnail1.png)

## Supported Univ. / 対応大学
- University of Tsukuba / 筑波大学

If you want to use it in your univ., please follow the [instruction](https://github.com/mkobayashime/manaba-enhanced#how-to-add-support-for-your-univ) below. 

## Features

1. Assignments will be colored according to the time to the deadline.

    Red: 1 day remaining  
    Yellow: 3 days remaining  
    Green: 7 days remaining

1. The report entered in the report input screen will be auto-saved, and not disappear even if the page is closed.

1. Highlight the publication deadline of course newses and course contents.

1. Enable filtering of courses in mypage by terms/modules.

1. Remove the confirmation dialogue when you click links.

1. Add a context menu to open the attend code in Respon.

## 機能

1. マイページに表示される課題一覧を、締切までの時間によって色分けします

    赤: 期限まであと1日  
    黄: 期限まであと3日  
    緑: 期限まであと7日

1. レポート入力画面で入力しているレポートを自動保存し、ページを閉じても消えないようにします

1. コースニュースやコンテンツの公開期限を強調表示します

1. マイページのコースをモジュールでフィルターする機能を追加します

1. 外部リンクをクリックした際の確認ダイアログを取り除きます

1. 出席コードをResponで開く右クリックメニューを追加します

## Development

This extension is built on top of awesome [chrome-extension-cli](https://github.com/dutiyesh/chrome-extension-cli).

```
yarn // Install dependencies

yarn watch // Run in dev mode

yarn build // When the app is ready to publish in store
```

## How to add support for your univ.

If your univ. is using manaba and there is "Assignments" tab in the mypage, please follow the instruction below to use this extension.

1. Fork this repository.
1. Replace `matches` of `content_scripts` in `manifest.json` with the url of manaba of your univ..
1. Build and install in Chrome.  
Please see [chrome-extension-cli](https://github.com/dutiyesh/chrome-extension-cli) for more detailed information.

あなたの大学がmanabaを導入しており、マイページに「未提出課題」タブが存在する場合、以下の手順で対応が可能です。

1. このレポジトリをフォークする。
1. `manifest.json`に記述されている`content_scripts`の`matches`をあなたの大学のmanabaのURLに変更する。
1. ビルドしChromeにインストールする。  
詳細は前項の[chrome-extension-cli](https://github.com/dutiyesh/chrome-extension-cli)を参照してください。

## Contribution

Suggestions and pull requests are welcomed!

## License

[MIT License](./LICENSE)