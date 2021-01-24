"use strict"

export declare namespace checkLang {
  type langCode = "ja" | "en"
}

export const checkLang = (): checkLang.langCode => {
  const mylang = document.getElementById("mylang")

  if (mylang) {
    if (mylang.className.includes("mylang-ja")) {
      return "ja"
    } else if (mylang.className.includes("mylang-en")) {
      return "en"
    } else if (mylang.innerText.includes("English")) {
      // mylangのクラス名がサービス側で変更されたケースがあったため、フォールバック
      return "ja"
    } else if (mylang.innerText.includes("日本語")) {
      // mylangのクラス名がサービス側で変更されたケースがあったため、フォールバック
      return "en"
    } else {
      // 日本語をデフォルトに
      return "ja"
    }
  }

  return "ja"
}
