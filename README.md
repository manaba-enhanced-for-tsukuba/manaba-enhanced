# manaba Enhanced

Make your manaba a little bit more comfortable.

Get it via [Chrome Web Store](https://chrome.google.com/webstore/detail/manaba-enhanced/fldngcbchlbfgbccilklplmhljilhfch).

**Mainly for students of University of Tsukuba.**

![Screenshot](./bin/dist/thumbnail1.png)

## Supported Univ. / 対応大学
- University of Tsukuba / 筑波大学

If you want to add support for your univ., please follow the [instruction](https://github.com/mkobayashime/manaba-enhanced#how-to-add-support-for-your-univ) below. 

## Features

1. Assignments will be colored according to the time to the deadline.

    Red: 1 day remaining  
    Yellow: 3 days remaining  
    Green: 7 days remaining

1. The report entered in the report input screen will be auto-saved, and not disappear even if the page is closed.

1. Highlight the publication deadline of course newses and course contents.

1. Remove the confirmation dialogue when you click links.

## 機能

1. マイページ表示される課題一覧を、締切までの時間によって色分けします

    赤: 期限まであと1日  
    黄: 期限まであと3日  
    緑: 期限まであと7日

1. レポート入力画面で入力しているレポートを自動保存し、ページを閉じても消えないようにします

1. コースニュースやコンテンツの公開期限を強調表示します

1. 外部リンクをクリックした際の確認ダイアログを取り除きます

## Development

This extension is built on top of awesome [chrome-extension-cli](https://github.com/dutiyesh/chrome-extension-cli).

```
yarn // Install dependencies

yarn watch // Run in dev mode

yarn build // When the app is ready to publish in store
```

## How to add support for your univ.

If your univ. is using manaba and there is "Assignments" tab in the mypage, please follow the instruction below to use this extension.

1. Add the url of manaba of your univ. to `matches` of `content_scripts` in `manifest.json`.
1. Build and install in Chrome.  
Please see [chrome-extension-cli](https://github.com/dutiyesh/chrome-extension-cli) for more detailed information.

Then you can create PR to publish the compatible version in Chrome Web Store. Write your univ. name in PR.

あなたの大学がmanabaを導入しており、マイページに「未提出課題」タブが存在する場合、以下の手順で対応が可能です。

1. `manifest.json`に記述されている`content_scripts`の`matches`にあなたの大学のmanabaのURLを追加する。
1. ビルドしChromeにインストールする。  
詳細は前項の[chrome-extension-cli](https://github.com/dutiyesh/chrome-extension-cli)を参照してください。

正常に動作することが確認できた場合、PRを作成していただければ大学対応バージョンをChrome Web Storeに公開することも可能です。PRに対応大学を追加する旨、大学名を明記してください。

## Contribution

Suggestions and pull requests are welcomed!

## License

MIT License

Copyright (c) 2020 Masaki Kobayashi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
