"use strict"

/**
 * Returns current display language
 * @return {string} - "ja" or "en"
 */
const checkLang = (): "ja" | "en" => {
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

export default checkLang
