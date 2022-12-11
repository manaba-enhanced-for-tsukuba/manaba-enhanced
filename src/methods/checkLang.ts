"use strict"

export declare namespace checkLang {
  type langCode = "ja" | "en"
}

export const checkLang = (): checkLang.langCode => {
  const mylang = document.getElementById("mylang")
  if (!mylang) return "ja"

  return checkLangByClassName(mylang) ?? checkLangByInnerText(mylang) ?? "ja"
}

const checkLangByClassName = (
  mylang: HTMLElement
): checkLang.langCode | undefined => {
  switch (mylang.className) {
    case "mylang-ja":
      return "ja"
    case "mylang-en":
      return "en"
    default:
      return undefined
  }
}

const checkLangByInnerText = (
  mylang: HTMLElement
): checkLang.langCode | undefined => {
  switch (mylang.innerText) {
    case "日本語":
      return "ja"
    case "English":
      return "en"
    default:
      return undefined
  }
}
